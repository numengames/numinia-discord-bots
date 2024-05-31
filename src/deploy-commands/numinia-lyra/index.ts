import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { createLoggerHandler, initLogger } from '@numengames/numinia-logger';

import config from '../../config';
import commands from './commands';

dotenv.config({ path: 'deploy-commands.env' });

const { LYRA_BOT_TOKEN, LYRA_GUILD_ID, LYRA_APPLICATION_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(LYRA_BOT_TOKEN as string);

initLogger(config.logger);

const loggerHandler = createLoggerHandler('deploy-commands-lyra');

(async () => {
  try {
    loggerHandler.logInfo('Loading application commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        LYRA_APPLICATION_ID as string,
        LYRA_GUILD_ID as string,
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
