module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      script: 'ts-node',
      args: 'src/bots/lyra.ts',
    },
    {
      watch: true,
      script: 'ts-node',
      name: 'senet-dungeon-world-master',
      args: 'src/bots/senet-dungeon-world-master.ts',
    },
    {
      watch: false,
      script: 'ts-node',
      name: 'health-check',
      args: 'src/server.ts',
      env: {
        PM2_API_PORT: 8000,
      },
    },
  ],
  pm2api: {
    port: 8000,
  },
};
