module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      exec_mode: 'cluster',
      script: 'dist/bots/lyra.js',
    },
    {
      watch: false,
      max_restarts: 0,
      exec_mode: 'fork',
      autorestart: false,
      name: 'numinia-lyra-commands',
      script: 'dist/deploy-commands/numinia-lyra/index.js',
    },
    {
      watch: true,
      exec_mode: 'cluster',
      name: 'senet-dungeon-world-master',
      script: 'dist/bots/senet-dungeon-world-master.js',
    },
    {
      watch: false,
      max_restarts: 0,
      exec_mode: 'fork',
      autorestart: false,
      name: 'senet-dungeon-world-master-commands',
      script: 'dist/deploy-commands/senet-dungeon-world-master/index.js',
    },
    {
      watch: false,
      name: 'health-check',
      exec_mode: 'cluster',
      script: 'dist/server.js',
    },
  ],
};
