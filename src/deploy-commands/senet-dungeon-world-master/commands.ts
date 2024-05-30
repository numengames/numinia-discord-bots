import { COMMANDS } from '../../constants';
import assistants from '../../assistants';

export default [
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
];
