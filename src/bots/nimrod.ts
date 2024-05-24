import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { loggerHandler } from '@numengames/numinia-logger';

import Bot from './bot';

dotenv.config();

(async () => {
  const logger = loggerHandler('nimrod');

  const token = process.env.NIMROD_BOT_TOKEN || '';

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
    botName: 'nimrod',
  });

  bot.init();
})();
