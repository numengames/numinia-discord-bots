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
            value: assistants.SENET.discordId,
          },
          {
            name: 'Gumala',
            value: assistants.GUMALA.discordId,
          },
          {
            name: 'Thoth',
            value: assistants.THOTH.discordId,
          },
          {
            name: 'Procyon',
            value: assistants.PROCYON.discordId,
          },
          {
            name: 'Nimrod',
            value: assistants.NIMROD.discordId,
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

const { LYRA_TOKEN, LYRA_GUILD_ID, LYRA_APPLICATION_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(LYRA_TOKEN as string);

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
