import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { loggerHandler } from '@numengames/numinia-logger';

import Bot from './bot';

dotenv.config();

(async () => {
  const logger = loggerHandler('senet-dungeon-world-master');

  const token = process.env.SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN || '';

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
    ],
  });

  const bot = new Bot({
    token,
    logger,
    client,
    botName: 'senet-dungeon-world-master',
  });

  bot.init();
  bot.replyConversation();
  bot.createConversation();
})();
