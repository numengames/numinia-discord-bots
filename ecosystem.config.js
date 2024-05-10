module.exports = {
  apps : [{
    name: 'boba',
    script: 'boba.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
    env: {
      PM2_API_PORT: 8000
    }
  }, {
    name: 'gumala',
    script: 'gumala.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'lyra',
    script: 'lyra.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'nimrod',
    script: 'nimrod.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'procyon',
    script: 'procyon.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'senet',
    script: 'senet.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'thoth',
    script: 'thoth.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }, {
    name: 'senet-dungeon-world-master',
    script: 'senet-dungeon-world-master.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M',
  }],
  pm2api: {
    port: 8000
  }
};