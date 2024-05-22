import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits, Interaction } from 'discord.js';

import { COMMANDS } from './constants';
import replyConversation from './actions/reply-conversation';
import createConversation from './actions/create-conversation';

dotenv.config();

try {
  const token = process.env.SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN;

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
    console.log('Senet dungeon world master is ready!');
  });

  client.on('interactionCreate', async (interaction: Interaction) => {
    const createConversationListOptions = [
      COMMANDS.CREATE_CONVERSATION,
      COMMANDS.CREATE_ASSISTANT_CONVERSATION,
    ];

    if (
      interaction.isChatInputCommand() &&
      createConversationListOptions.includes(interaction.commandName)
    ) {
      try {
        await createConversation(interaction);
      } catch (error: unknown) {
        console.log(error);
      }
    }
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
