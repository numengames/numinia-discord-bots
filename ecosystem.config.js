const path = require('path');

module.exports = {
  apps: [
    {
      script: 'ts-node',
      name: 'gumala',
      args: 'src/bots/gumala/index.ts',
    },
    {
      script: 'ts-node',
      name: 'nimrod',
      args: 'src/bots/nimrod/index.ts',
    },
    {
      script: 'ts-node',
      name: 'procyon',
      args: 'src/bots/procyon/index.ts',
    },
    {
      script: 'ts-node',
      name: 'senet',
      args: 'src/bots/senet/index.ts',
    },
    {
      script: 'ts-node',
      name: 'senet-dungeon-world-master',
      args: 'src/bots/senet-dungeon-world-master/index.ts',
    },
    {
      script: 'ts-node',
      name: 'thoth',
      args: 'src/bots/thoth/index.ts',
    },
    {
      watch: false,
      script: 'ts-node',
      exec_mode: 'fork',
      autorestart: false,
      name: 'senet-dungeon-world-master-deploy-commands',
      args: 'src/bots/senet-dungeon-world-master/deploy-commands.ts',
    },
    {
      watch: false,
      script: 'ts-node',
      exec_mode: 'fork',
      autorestart: false,
      name: 'lyra-deploy-commands',
      args: 'src/bots/lyra/deploy-commands.ts',
    },
    {
      name: 'health-check',
      args: path.join(__dirname, 'src/server.ts'),
      script: '/usr/local/bin/ts-node',
      env: {
        PM2_API_PORT: 8000,
      },
    },
  ],
  pm2api: {
    port: 8000,
  },
};
