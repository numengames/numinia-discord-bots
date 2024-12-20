export default {
  port: 8000,
  logger: {
    loki: {
      isActive: true,
      job: 'numinia-discord-bots',
      host: 'https://logs-prod-012.grafana.net',
      user: process.env.GRAFANA_LOGGER_USER || 'test',
      password: process.env.GRAFANA_LOGGER_PASSWORD || 'test',
    },
    discord: {
      isActive: false,
      service: 'numinia-discord-bots',
      webhook: process.env.DISCORD_WEBHOOK || 'test',
    },
  },
};
