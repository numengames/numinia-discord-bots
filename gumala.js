const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

const SERVER_URL = 'https://integrations-api.numinia.xyz/api/v1/openai/assistant/send-text-message';

client.on('ready', () => {
  console.log(`Bot iniciado como ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.mentions.has(client.user)) {
    const textMessage = message.content.trim().slice(client.user.toString().length).trim();

    const params = new URLSearchParams();
    params.append('assistant', 'GUMALA');
    params.append('message', textMessage);

    if (textMessage) {
      try {
        const response = await axios.post(SERVER_URL, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        message.reply(response.data);
      } catch (error) {
        message.reply('There was an issue with the request to the server.');
      }
    }
  }
});

client.login(process.env.GUMALA_BOT_TOKEN);