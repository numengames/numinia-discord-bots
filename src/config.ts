export default {
  logger: {
    loki: {
      isActive: true,
      job: 'numinia-discord-bots',
      host: 'https://logs-prod-012.grafana.net',
      user: process.env.GRAFANA_LOGGER_USER || 'test',
      password: process.env.GRAFANA_LOGGER_PASSWORD || 'test',
    },
    discord: {
      isActive: true,
      service: 'numinia-discord-bot',
      webhook: process.env.DISCORD_WEBHOOK || 'test',
    },
  },
};
