import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

import replyConversation from './actions/reply-conversation';

dotenv.config();

try {
  const token = process.env.THOTH_BOT_TOKEN;

  if (!token) {
    throw new Error('Token is not defined in the env variables');
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.GuildMessageReactions,
    ],
  });

  client.once('ready', () => {
    console.log('Thoth is ready!');
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) {
      return;
    }

    try {
      await replyConversation(message);
    } catch (error) {
      message.reply('There was an issue with the request to the server.');
    }
  });

  client.login(token);
} catch (error: unknown) {
  console.error(error);
}
