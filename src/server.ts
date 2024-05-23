import pm2, { ProcessDescription } from 'pm2';
import express, { Request, Response } from 'express';

const PORT = 8000;

const app = express();

app.get('/health', (_req: Request, res: Response) => {
  pm2.connect((err: unknown) => {
    if (err) {
      console.error('Failed to connect to PM2:', err);
      return res
        .status(500)
        .json({ status: 'error', message: 'Failed to connect to PM2' });
    }

    pm2.list((err: unknown, list) => {
      pm2.disconnect();
      if (err) {
        console.error('Failed to list PM2 processes:', err);
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to list PM2 processes' });
      }

      const filteredList = list.filter(
        (proc) => proc.name !== 'senet-dungeon-world-master-deploy-commands',
      );

      const isHealthy = filteredList.every(
        (proc: ProcessDescription) => proc.pm2_env?.status === 'online',
      );

      if (isHealthy) {
        return res.send();
      }

      return res
        .status(500)
        .json({ status: 'error', message: 'Some processes are not online' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
