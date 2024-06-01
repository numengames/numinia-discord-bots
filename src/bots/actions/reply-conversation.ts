import {
  Client,
  Message,
  TextChannel,
  ThreadChannel,
  PartialMessage,
} from 'discord.js';
import { interfaces } from '@numengames/numinia-logger';

import { getAssistantByOpenaiId } from '../../assistants';
import { IIntegrationsApiService } from '../../services/integrations-api-service';

interface IReplyConversation {
  handleReplyMessage(botName: string): void;
}

interface IParams {
  client: Client;
  loggerHandler: interfaces.ILogger;
  integrationsApiService: IIntegrationsApiService;
}

export default class ReplyConversation implements IReplyConversation {
  private client: Client;

  private loggerHandler: interfaces.ILogger;

  private integrationsApiService: IIntegrationsApiService;

  constructor({ client, integrationsApiService, loggerHandler }: IParams) {
    this.loggerHandler = loggerHandler;
    this.client = client;
    this.integrationsApiService = integrationsApiService;
  }

  private async replyConversation(
    message: Message<boolean> | PartialMessage,
    discordId: string,
  ) {
    const isThread = message.channel instanceof ThreadChannel;
    this.loggerHandler.logInfo(`replyConversation - isThread: ${isThread}`);

    const textMessage = message.content?.trim();
    this.loggerHandler.logInfo(
      `replyConversation - textMessage: ${textMessage}`,
    );

    if (isThread && textMessage) {
      const conversationId = `discord-${message.channel.id}`;
      this.loggerHandler.logInfo(
        `replyConversation - replying conversationId ${conversationId}`,
      );

      try {
        const response =
          await this.integrationsApiService.handleAssistantMessage(
            conversationId,
            { role: 'user', message: textMessage },
          );
        this.loggerHandler.logInfo(
          'replyConversation - received response from API',
        );

        const threadChannel = message.channel as ThreadChannel;
        const parentChannel = threadChannel.parent as TextChannel;

        if (!parentChannel) {
          throw new Error('Parent channel not found for the thread.');
        }

        const botMentioned = await this.client.users.fetch(discordId || '');
        this.loggerHandler.logInfo(
          `replyConversation - botMentioned: ${botMentioned.username}`,
        );

        const webhook = await parentChannel.createWebhook({
          name: botMentioned.username,
          avatar: botMentioned.displayAvatarURL(),
        });
        this.loggerHandler.logInfo('replyConversation - webhook created');

        await webhook.send({
          content: response,
          threadId: message.channel.id,
        });
        this.loggerHandler.logInfo(
          'replyConversation - message sent via webhook',
        );

        await webhook.delete();
        this.loggerHandler.logInfo('replyConversation - webhook deleted');
      } catch (error: unknown) {
        this.loggerHandler.logError(
          'replyConversation - error occurred',
          error as Error,
        );
        throw error;
      }
    }
  }

  handleReplyMessage(botName: string): void {
    this.client.on('messageCreate', async (message: Message) => {
      this.loggerHandler.logInfo(
        'handleReplyMessage - messageCreate event fired',
      );

      if (message.author.bot || !(message.channel instanceof ThreadChannel)) {
        this.loggerHandler.logInfo(
          'handleReplyMessage - message ignored (either from bot or not in a thread)',
        );
        return;
      }

      const thread = message.channel as ThreadChannel;

      this.loggerHandler.logInfo(
        `replyMessage - Replying a message with threadId discord-${thread.id}`,
      );

      try {
        const threadInfo =
          await this.integrationsApiService.getConversationById(
            `discord-${thread.id}`,
          );
        this.loggerHandler.logInfo(
          'handleReplyMessage - thread info retrieved',
        );

        const getAssistantByOpenai = getAssistantByOpenaiId(
          (threadInfo.assistant as Record<string, string>).id,
        );
        this.loggerHandler.logInfo(
          `handleReplyMessage - assistant retrieved: ${getAssistantByOpenai.discordId}`,
        );

        await this.replyConversation(message, getAssistantByOpenai.discordId);
        this.loggerHandler.logInfo(
          'handleReplyMessage - replyConversation executed successfully',
        );
      } catch (error) {
        this.loggerHandler.logError(
          `There was an issue with the reply to a ${botName} conversation`,
          error as Error,
        );

        this.loggerHandler.logInfo(
          'handleReplyMessage - sending error message to user',
        );
        message.reply('There was an issue with the request to the server.');
      }
    });
  }
}
