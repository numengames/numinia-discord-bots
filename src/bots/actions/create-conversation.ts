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
  logger: interfaces.ILogger;
  integrationsApiService: IIntegrationsApiService;
}

export default class CreateConversation implements ICreateConversation {
  private client: Client;

  private logger: interfaces.ILogger;

  private integrationsApiService: IIntegrationsApiService;

  constructor({ client, integrationsApiService, logger }: IParams) {
    this.logger = logger;
    this.client = client;
    this.integrationsApiService = integrationsApiService;
  }

  configureThreadParams(
    commandName: string,
    interaction: Interaction,
    threadParams: Record<string, unknown>,
  ) {
    if (interaction.isChatInputCommand()) {
      if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
        const discordId = interaction.options.getString('ai-agent')!;

        const assistant = getAssistantByDiscordId(discordId);

        threadParams.assistant = {
          id: assistant.openaiId,
          name: assistant.fullName,
        };
      } else if (commandName === COMMANDS.CREATE_CONVERSATION) {
        threadParams.model = interaction.options.getString('model');
      }
    }
  }

  async createThread(channel: TextChannel, name: string) {
    return await channel.threads.create({
      name,
      reason: 'New conversation with the IA',
    });
  }

  async handleCommandMessage(
    commandName: string,
    conversationId: string,
    message: string,
  ): Promise<string> {
    const params = {
      message,
      role: 'user',
    };

    if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
      return this.integrationsApiService.handleAssistantMessage(
        conversationId,
        params,
      );
    }

    if (commandName === COMMANDS.CREATE_CONVERSATION) {
      return this.integrationsApiService.handleMessage(conversationId, params);
    }

    return '';
  }

  async createConversation(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const { commandName, channel, user } = interaction;

    const threadParams: Record<string, unknown> = {
      type: 'chatgpt',
      origin: 'discord',
      name: interaction.options.getString('title'),
    };

    try {
      this.configureThreadParams(commandName, interaction, threadParams);

      if (
        !channel ||
        !channel.isTextBased() ||
        !(channel instanceof TextChannel)
      ) {
        return;
      }

      await interaction.deferReply({ ephemeral: true });

      const thread = await this.createThread(
        channel,
        threadParams.name as string,
      );

      const message = interaction.options.getString('message');

      const userWebhook = await channel.createWebhook({
        name: user.username,
        avatar: user.displayAvatarURL(),
      });

      await userWebhook.send({
        content: message as string,
        threadId: thread.id,
      });

      threadParams.conversationId = `discord-${thread.id}`;

      await this.integrationsApiService.createConversation(threadParams);

      const response = await this.handleCommandMessage(
        commandName,
        threadParams.conversationId as string,
        message as string,
      );

      const botMentionedId = interaction.options.getString('ai-agent');
      const botMentioned = await this.client.users.fetch(botMentionedId || '');

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
      await interaction.editReply({
        content: 'There was an error processing the request.',
      });
    }
  }

  handleCreateConversation(): void {
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      this.logger.logInfo('messageCreate - Creating a new conversation');

      const createConversationListOptions = [
        COMMANDS.CREATE_CONVERSATION,
        COMMANDS.CREATE_ASSISTANT_CONVERSATION,
      ];

      if (
        interaction.isChatInputCommand() &&
        createConversationListOptions.includes(interaction.commandName)
      ) {
        try {
          await this.createConversation(interaction);
        } catch (error: unknown) {
          console.log(error);
        }
      }
    });
  }
}
