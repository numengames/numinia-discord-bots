import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { createLoggerHandler, initLogger } from '@numengames/numinia-logger';

import config from '../config';
import Bot from './bot';

dotenv.config();

initLogger(config.logger);

const logger = createLoggerHandler('senet-dungeon-world-master');

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
  loggerHandler: logger,
  client,
  botName: 'senet-dungeon-world-master',
});

bot.init();
bot.createConversation();
bot.replyConversation();
