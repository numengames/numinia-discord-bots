module.exports = {
  apps : [{
    name: 'boba',
    script: 'boba.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M'
  }, {
    name: 'gumala',
    script: 'gumala.js',
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '100M'
  }
]
};