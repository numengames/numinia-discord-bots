import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { createLoggerHandler, initLogger } from '@numengames/numinia-logger';

import Bot from './bot';
import config from '../config';

dotenv.config();

initLogger(config.logger);

const loggerHandler = createLoggerHandler('lyra');

const token = process.env.LYRA_BOT_TOKEN || '';

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
  client,
  loggerHandler,
  botName: 'lyra',
});

bot.init();
bot.createConversation();
bot.replyConversation();
