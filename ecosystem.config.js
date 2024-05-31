module.exports = {
  apps: [
    {
      watch: true,
      name: 'lyra',
      script: 'ts-node',
      combine_logs: true,
      args: 'src/bots/lyra.ts',
      log_options: {
        'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
        'awslogs-region': 'your-aws-region',
        'awslogs-stream-prefix': 'pm2-logs',
      },
    },
    {
      watch: true,
      script: 'ts-node',
      combine_logs: true,
      name: 'senet-dungeon-world-master',
      args: 'src/bots/senet-dungeon-world-master.ts',
      log_options: {
        'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
        'awslogs-region': 'your-aws-region',
        'awslogs-stream-prefix': 'pm2-logs',
      },
    },
    {
      watch: false,
      script: 'ts-node',
      combine_logs: true,
      name: 'health-check',
      args: 'src/server.ts',
      log_options: {
        'awslogs-group': '/ecs/numinia-discord-bots-fargate-service',
        'awslogs-region': 'your-aws-region',
        'awslogs-stream-prefix': 'pm2-logs',
      },
    },
  ],
};
