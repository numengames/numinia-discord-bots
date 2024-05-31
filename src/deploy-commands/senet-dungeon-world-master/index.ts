import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { createLoggerHandler, initLogger } from '@numengames/numinia-logger';

import commands from './commands';
import config from '../../config';

dotenv.config({ path: 'deploy-commands.env' });

initLogger(config.logger);

const {
  SENET_DUNGEON_WORLD_MASTER_GUILD_ID,
  SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN,
  SENET_DUNGEON_WORLD_MASTER_APPLICATION_ID,
} = process.env;

const rest = new REST({ version: '10' }).setToken(
  SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN as string,
);

const loggerHandler = createLoggerHandler(
  'deploy-commands-senet-dungeon-world-master',
);

(async () => {
  try {
    loggerHandler.logInfo('Loading application commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        SENET_DUNGEON_WORLD_MASTER_APPLICATION_ID as string,
        SENET_DUNGEON_WORLD_MASTER_GUILD_ID as string,
      ),
      {
        body: commands,
      },
    );

    loggerHandler.logInfo('Commands loaded sucessfully.');
  } catch (error: unknown) {
    loggerHandler.logError(
      'There was an error loading the commands',
      error as Error,
    );
  }
})();
