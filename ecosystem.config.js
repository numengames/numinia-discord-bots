module.exports = {
  apps: [
    // {
    //   watch: true,
    //   name: 'lyra',
    //   log_type: 'json',
    //   script: 'ts-node',
    //   combine_logs: true,
    //   args: 'src/bots/lyra.ts',
    //   log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    //   log_options: {
    //     'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
    //     'awslogs-region': 'your-aws-region',
    //     'awslogs-stream-prefix': 'pm2-logs',
    //   },
    // },
    // {
    //   watch: true,
    //   log_type: 'json',
    //   script: 'ts-node',
    //   combine_logs: true,
    //   name: 'senet-dungeon-world-master',
    //   log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    //   args: 'src/bots/senet-dungeon-world-master.ts',
    //   log_options: {
    //     'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
    //     'awslogs-region': 'your-aws-region',
    //     'awslogs-stream-prefix': 'pm2-logs',
    //   },
    // },
    {
      watch: false,
      log_type: 'json',
      script: 'ts-node',
      combine_logs: true,
      name: 'health-check',
      args: 'src/server.ts',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      log_options: {
        'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
        'awslogs-region': 'your-aws-region',
        'awslogs-stream-prefix': 'pm2-logs',
      },
      env: {
        PM2_API_PORT: 8000,
      },
    },
  ],
  pm2api: {
    port: 8000,
  },
};
