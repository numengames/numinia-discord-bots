async function execute(message, args) {
  const threadName = args.join(' ');

  if (!threadName) {
    return message.reply('Please provide a name for the thread.');
  }

  try {
    const thread = await message.channel.threads.create({
      name: threadName,
      reason: 'New thread created by command',
    });

    const customID = `thread-${thread.id}`;
    message.reply(
      `Thread created: ${thread.name} with the custom ID ${customID}`,
    );
  } catch (error) {
    console.error(error);
    message.reply('There was an error creating the thread.');
  }
}

module.exports = {
  execute,
  name: 'create-new-thread',
  description:
    'Create a new channel to talk about something continuously when the user launch a command',
};
