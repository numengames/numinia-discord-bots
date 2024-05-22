const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const replyMessage = require('./actions/reply-message');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync(
    '/Users/devstarlight/Documents/work/numengames/numinia/numinia-discord-bots/bots/gumala-test/commands',
  )
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Bot init as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.mentions.has(client.user)) {
    await replyMessage(message, client);
  }

  const prefix = '!';
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    return;
  }

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command.');
  }
});

client.login('');
