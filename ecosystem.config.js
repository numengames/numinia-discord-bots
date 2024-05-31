module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      script: 'dist/bots/lyra.js',
    },
    {
      watch: true,
      name: 'senet-dungeon-world-master',
      script: 'dist/bots/senet-dungeon-world-master.js',
    },
    {
      watch: false,
      name: 'health-check',
      script: 'dist/server.js',
    },
  ],
};
