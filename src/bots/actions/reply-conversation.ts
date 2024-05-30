import {
  Client,
  Message,
  PartialMessage,
  TextChannel,
  ThreadChannel,
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

    const textMessage = message.content?.trim();

    if (isThread && textMessage) {
      const conversationId = `discord-${message.channel.id}`;
      this.loggerHandler.logInfo(
        `replyConversation - replying conversationId ${conversationId}`,
      );

      const response = await this.integrationsApiService.handleAssistantMessage(
        conversationId,
        { role: 'user', message: textMessage },
      );

      const threadChannel = message.channel as ThreadChannel;
      const parentChannel = threadChannel.parent as TextChannel;

      if (!parentChannel) {
        throw new Error('Parent channel not found for the thread.');
      }

      const botMentioned = await this.client.users.fetch(discordId || '');

      const webhook = await parentChannel.createWebhook({
        name: botMentioned.username,
        avatar: botMentioned.displayAvatarURL(),
      });

      // Send the reply using the webhook
      await webhook.send({
        content: response,
        threadId: message.channel.id,
      });

      await webhook.delete();
    }
  }

  handleReplyMessage(botName: string): void {
    this.client.on('messageCreate', async (message) => {
      if (message.author.bot || !(message.channel instanceof ThreadChannel)) {
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

        const getAssistantByOpenai = getAssistantByOpenaiId(
          (threadInfo.assistant as Record<string, string>).id,
        );

        await this.replyConversation(message, getAssistantByOpenai.discordId);
      } catch (error) {
        this.loggerHandler.logError(
          `There was an issue with the reply to a ${botName} conversation`,
          error as Error,
        );
        message.reply('There was an issue with the request to the server.');
      }
    });
  }
}
