import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

import commands from './commands';

dotenv.config({ path: 'deploy-commands.env' });

const { LYRA_BOT_TOKEN, LYRA_GUILD_ID, LYRA_APPLICATION_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(LYRA_BOT_TOKEN as string);

(async () => {
  try {
    console.log('Registrando comandos de aplicación...');

    await rest.put(
      Routes.applicationGuildCommands(
        LYRA_APPLICATION_ID as string,
        LYRA_GUILD_ID as string,
      ),
      {
        body: commands,
      },
    );

    console.log('Comandos registrados correctamente.');
  } catch (error) {
    console.error('Error al registrar los comandos:', error);
  }
})();
