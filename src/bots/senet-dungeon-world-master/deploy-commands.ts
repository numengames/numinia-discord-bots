import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

import { COMMANDS } from './constants';
import assistants from '../../assistants';

const commands = [
  {
    name: COMMANDS.CREATE_ASSISTANT_CONVERSATION,
    description: 'Create a new conversation with an AI Agent',
    options: [
      {
        type: 3,
        name: 'ai-agent',
        description: 'AI Agent to interact with',
        required: true,
        choices: [
          {
            name: 'Senet',
            value: assistants.SENET_DUNGEON_WORLD_MASTER.discordId,
          },
        ],
      },
      {
        type: 3,
        required: true,
        name: 'title',
        description: 'What is the title of the conversation?',
      },
      {
        type: 3,
        required: true,
        name: 'message',
        description: 'What do you want to ask the AI Agent?',
      },
    ],
  },
  // {
  //   name: COMMANDS.CREATE_CONVERSATION,
  //   description: 'Create a new conversation with a specific model',
  //   options: [
  //     {
  //       type: 3,
  //       name: 'model',
  //       description: 'Models to interact with',
  //       required: true,
  //       choices: [{ name: 'gpt-4o', value: 'gpt-4o' }],
  //     },
  //     {
  //       type: 3,
  //       required: true,
  //       name: 'title',
  //       description: 'What is the title of the conversation?',
  //     },
  //     {
  //       type: 3,
  //       required: true,
  //       name: 'message',
  //       description: 'What do you want to ask the AI Agent?',
  //     },
  //   ],
  // },
];

const {
  SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN,
  SENET_DUNGEON_WORLD_MASTER_GUILD_ID,
  SENET_DUNGEON_WORLD_MASTER_APPLICATION_ID,
} = process.env;

const rest = new REST({ version: '10' }).setToken(
  SENET_DUNGEON_WORLD_MASTER_BOT_TOKEN as string,
);

(async () => {
  try {
    console.log('Registrando comandos de aplicación...');

    await rest.put(
      Routes.applicationGuildCommands(
        SENET_DUNGEON_WORLD_MASTER_APPLICATION_ID as string,
        SENET_DUNGEON_WORLD_MASTER_GUILD_ID as string,
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
