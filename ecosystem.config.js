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
  }],
  pm2api: {
    port: 8000
  }
};