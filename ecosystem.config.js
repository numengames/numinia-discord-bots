module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      script: 'ts-node',
      args: 'src/bots/lyra.ts',
    },
    // {
    //   watch: true,
    //   name: 'gumala',
    //   script: 'ts-node',
    //   args: 'src/bots/gumala.ts',
    // },
    // {
    //   watch: true,
    //   name: 'nimrod',
    //   script: 'ts-node',
    //   args: 'src/bots/nimrod.ts',
    // },
    // {
    //   watch: true,
    //   name: 'procyon',
    //   script: 'ts-node',
    //   args: 'src/bots/procyon.ts',
    // },
    // {
    //   watch: true,
    //   name: 'senet',
    //   script: 'ts-node',
    //   args: 'src/bots/senet.ts',
    // },
    {
      watch: true,
      script: 'ts-node',
      name: 'senet-dungeon-world-master',
      args: 'src/bots/senet-dungeon-world-master.ts',
    },
    // {
    //   watch: true,
    //   name: 'thoth',
    //   script: 'ts-node',
    //   args: 'src/bots/thoth.ts',
    // },
    {
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
