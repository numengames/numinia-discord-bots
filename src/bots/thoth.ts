import express from 'express';
import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { loggerHandler, loggerMiddleware } from '@numengames/numinia-logger';

import Bot from './bot';
import config from '../config';

dotenv.config();

const app = express();

loggerMiddleware(config.logger, app);

const logger = loggerHandler('thoth');

const token = process.env.THOTH_BOT_TOKEN || '';

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
  botName: 'thoth',
});

bot.init();
