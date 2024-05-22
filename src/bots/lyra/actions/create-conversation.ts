import { Interaction, TextChannel } from 'discord.js';

import { COMMANDS } from '../constants';
import assistants from '../../../assistants';
import { integrationsApiService } from '../../../services';

function configureThreadParams(
  commandName: string,
  interaction: Interaction,
  threadParams: Record<string, unknown>,
) {
  if (interaction.isChatInputCommand()) {
    if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
      threadParams.assistant = {
        name: assistants.SENET.name,
        id: assistants.SENET.openaiId,
      };
    } else if (commandName === COMMANDS.CREATE_CONVERSATION) {
      threadParams.model = interaction.options.getString('model');
    }
  }
}

async function createThread(channel: TextChannel, name: string) {
  return await channel.threads.create({
    name,
    reason: 'New conversation with the IA',
  });
}

async function handleCommandMessage(
  commandName: string,
  conversationId: string,
  message: string,
): Promise<string> {
  const params = {
    message,
    role: 'user',
  };

  if (commandName === COMMANDS.CREATE_ASSISTANT_CONVERSATION) {
    return integrationsApiService.handleAssistantMessage(
      conversationId,
      params,
    );
  }

  if (commandName === COMMANDS.CREATE_CONVERSATION) {
    return integrationsApiService.handleMessage(conversationId, params);
  }

  return '';
}

async function createConversation(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const { commandName, channel, user } = interaction;

  const threadParams: Record<string, unknown> = {
    type: 'chatgpt',
    origin: 'discord',
    name: interaction.options.getString('title'),
  };

  try {
    configureThreadParams(commandName, interaction, threadParams);

    if (
      !channel ||
      !channel.isTextBased() ||
      !(channel instanceof TextChannel)
    ) {
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const thread = await createThread(channel, threadParams.name as string);

    const message = interaction.options.getString('message');

    const webhook = await channel.createWebhook({
      name: user.username,
      avatar: user.displayAvatarURL(),
    });

    const initialMessage = await webhook.send({
      content: message as string,
      username: user.username,
      avatarURL: user.displayAvatarURL(),
      threadId: thread.id,
    });

    threadParams.conversationId = `discord-${thread.id}`;

    await integrationsApiService.createConversation(threadParams);

    const response = await handleCommandMessage(
      commandName,
      threadParams.conversationId as string,
      message as string,
    );

    await initialMessage.reply(response);

    await interaction.editReply({
      content: 'The thread has been created with an initial attached response.',
    });

    await webhook.delete();
  } catch (error: unknown) {
    await interaction.editReply({
      content: 'There was an error processing the request.',
    });
  }
}

export default createConversation;
