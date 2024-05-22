async function execute(message) {
  const channelName = message.content.split(' ')[1];

  if (!channelName) {
    message.channel.send('Please, set a name for this channel.');
    return;
  }

  try {
    const newChannel = await message.guild.channels.create({
      name: channelName,
      type: 2,
    });

    const customID = `channel-${newChannel.id}`;

    message.channel.send(
      `New channel has been created: ${newChannel.name} with the custom ID: ${customID}`,
    );
  } catch (error) {
    console.error(error);
    message.channel.send('There was an error creating the channel.');
  }
}

module.exports = {
  execute,
  name: 'create-new-channel',
  description:
    'Create a new channel to talk about something continuously when the user launch a command',
};
