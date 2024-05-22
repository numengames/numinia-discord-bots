import { Message, PartialMessage, ThreadChannel } from 'discord.js';

import { integrationsApiService } from '../../../services';

export default async (message: Message<boolean> | PartialMessage) => {
  const isThread = message.channel instanceof ThreadChannel;

  if (isThread) {
    const conversationId = `discord-${message.channel.id}`;

    const textMessage = message.content?.trim();

    if (textMessage) {
      try {
        const response = await integrationsApiService.handleAssistantMessage(
          conversationId,
          { role: 'user', message: textMessage },
        );

        message.reply(response);
      } catch (error) {
        message.reply('There was an issue with the request to the server.');
      }
    }
  }
};
