module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      exec_mode: 'cluster',
      max_memory_restart: '250M',
      script: 'dist/bots/lyra.js',
    },
    {
      watch: false,
      exec_mode: 'fork',
      max_memory_restart: '250M',
      name: 'numinia-lyra-commands',
      script: 'dist/deploy-commands/numinia-lyra/index.js',
    },
    {
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '250M',
      name: 'senet-dungeon-world-master',
      script: 'dist/bots/senet-dungeon-world-master.js',
    },
    {
      watch: false,
      exec_mode: 'fork',
      max_memory_restart: '250M',
      name: 'senet-dungeon-world-master-commands',
      script: 'dist/deploy-commands/senet-dungeon-world-master/index.js',
    },
    {
      watch: false,
      name: 'health-check',
      exec_mode: 'cluster',
      script: 'dist/server.js',
      max_memory_restart: '250M',
    },
  ],
};
