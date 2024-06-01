import { interfaces } from '@numengames/numinia-logger';
import { Client, Interaction, TextChannel } from 'discord.js';

import { COMMANDS } from '../../constants';
import { getAssistantByDiscordId } from '../../assistants';
import { IIntegrationsApiService } from '../../services/integrations-api-service';

interface ICreateConversation {
  handleCreateConversation(): void;
}

interface IParams {
  client: Client;
  loggerHandler: interfaces.ILogger;
  integrationsApiService: IIntegrationsApiService;
}

export default class CreateConversation implements ICreateConversation {
  private client: Client;

  private loggerHandler: interfaces.ILogger;

  private integrationsApiService: IIntegrationsApiService;

  constructor({ client, integrationsApiService, loggerHandler }: IParams) {
    this.loggerHandler = loggerHandler;
    this.client = client;
    this.integrationsApiService = integrationsApiService;
  }

  configureThreadParams(
    commandName: string,
    interaction: Interaction,
    threadParams: Record<string, unknown>,
  ) {
    this.loggerHandler.logInfo(
      `configureThreadParams - commandName: ${commandName}`,
    );

    if (interaction.isChatInputCommand()) {
      if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
        const discordId = interaction.options.getString('ai-agent')!;
        this.loggerHandler.logInfo(
          `configureThreadParams - discordId: ${discordId}`,
        );

        const assistant = getAssistantByDiscordId(discordId);

        threadParams.assistant = {
          id: assistant.openaiId,
          name: assistant.fullName,
        };
      } else if (commandName === COMMANDS.CREATE_CONVERSATION) {
        threadParams.model = interaction.options.getString('model');
      } else {
        throw new Error('The command does not exist');
      }
    }
  }

  async createThread(channel: TextChannel, name: string) {
    this.loggerHandler.logInfo(
      `createThread - Creating thread with name: ${name}`,
    );

    const thread = await channel.threads.create({
      name,
      reason: 'New conversation with the IA',
    });

    this.loggerHandler.logInfo(
      `createThread - Thread created with id: ${thread.id}`,
    );
    return thread;
  }

  async handleCommandMessage(
    commandName: string,
    conversationId: string,
    message: string,
  ): Promise<string> {
    this.loggerHandler.logInfo(
      `handleCommandMessage - commandName: ${commandName}, conversationId: ${conversationId}`,
    );

    const params = {
      message,
      role: 'user',
    };

    if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
      const response = await this.integrationsApiService.handleAssistantMessage(
        conversationId,
        params,
      );

      this.loggerHandler.logInfo(
        'handleCommandMessage - Response from handleAssistantMessage received',
      );

      return response;
    }

    if (commandName === COMMANDS.CREATE_CONVERSATION) {
      const response = await this.integrationsApiService.handleMessage(
        conversationId,
        params,
      );

      this.loggerHandler.logInfo(
        'handleCommandMessage - Response from handleMessage received',
      );

      return response;
    }

    return '';
  }

  async createConversation(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const { commandName, channel, user } = interaction;

    if (
      !channel ||
      !channel.isTextBased() ||
      !(channel instanceof TextChannel)
    ) {
      this.loggerHandler.logInfo('createConversation - Invalid channel');
      return;
    }

    const threadParams: Record<string, unknown> = {
      type: 'chatgpt',
      origin: 'discord',
      name: interaction.options.getString('title'),
    };

    try {
      await interaction.deferReply({ ephemeral: true });
      this.loggerHandler.logInfo('createConversation - Reply deferred');

      this.configureThreadParams(commandName, interaction, threadParams);

      const thread = await this.createThread(
        channel,
        threadParams.name as string,
      );

      const message = interaction.options.getString('message');
      this.loggerHandler.logInfo(`createConversation - message: ${message}`);

      const userWebhook = await channel.createWebhook({
        name: user.username,
        avatar: user.displayAvatarURL(),
      });
      this.loggerHandler.logInfo('createConversation - User webhook created');

      await userWebhook.send({
        content: message as string,
        threadId: thread.id,
      });
      this.loggerHandler.logInfo(
        'createConversation - Message sent via user webhook',
      );

      threadParams.conversationId = `discord-${thread.id}`;
      this.loggerHandler.logInfo(
        `createConversation - conversationId: ${(threadParams.conversationId as string).toString()}`,
      );

      await this.integrationsApiService.createConversation(threadParams);
      this.loggerHandler.logInfo(
        'createConversation - Conversation created in API',
      );

      const response = await this.handleCommandMessage(
        commandName,
        threadParams.conversationId as string,
        message as string,
      );
      this.loggerHandler.logInfo(
        'createConversation - Response received from handleCommandMessage',
      );

      const botMentionedId = interaction.options.getString('ai-agent');
      const botMentioned = await this.client.users.fetch(botMentionedId || '');
      this.loggerHandler.logInfo(
        `createConversation - botMentioned: ${botMentioned.username.toString()}`,
      );

      const botWebhook = await channel.createWebhook({
        name: botMentioned.username,
        avatar: botMentioned.displayAvatarURL(),
      });

      await botWebhook.send({
        content: response,
        threadId: thread.id,
      });

      await interaction.editReply({
        content:
          'The thread has been created with an initial attached response.',
      });

      await userWebhook.delete();
      await botWebhook.delete();
    } catch (error: unknown) {
      this.loggerHandler.logError(
        'createConversation - Error occurred',
        error as Error,
      );
      try {
        await interaction.editReply({
          content: 'There was an error processing the request.',
        });
      } catch (editError: unknown) {
        this.loggerHandler.logError(
          'createConversation - Error editing reply',
          editError as Error,
        );
      }
    }
  }

  handleCreateConversation(): void {
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      this.loggerHandler.logInfo('interactionCreate - Event fired');

      const createConversationListOptions = [
        COMMANDS.CREATE_CONVERSATION,
        COMMANDS.CREATE_ASSISTANT_CONVERSATION,
      ];

      if (
        interaction.isChatInputCommand() &&
        createConversationListOptions.includes(interaction.commandName)
      ) {
        this.loggerHandler.logInfo(
          `interactionCreate - Command detected: ${interaction.commandName}`,
        );
        await this.createConversation(interaction);
      }
    });
  }
}
