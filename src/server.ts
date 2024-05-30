import pm2, { ProcessDescription } from 'pm2';
import express, { Request, Response } from 'express';

import config from './config';

const app = express();

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send();
  // pm2.connect((err: unknown) => {
  //   if (err) {
  //     console.error('Failed to connect to PM2:', err);
  //     return res
  //       .status(500)
  //       .json({ status: 'error', message: 'Failed to connect to PM2' });
  //   }

  //   pm2.list((err: unknown, list) => {
  //     pm2.disconnect();
  //     if (err) {
  //       console.error('Failed to list PM2 processes:', err);
  //       return res
  //         .status(500)
  //         .json({ status: 'error', message: 'Failed to list PM2 processes' });
  //     }

  //     const isHealthy = list.every(
  //       (proc: ProcessDescription) => proc.pm2_env?.status === 'online',
  //     );

  //     console.log('isHealthy', isHealthy);
  //     if (isHealthy) {
  //       return res.send();
  //     }

  //     return res
  //       .status(500)
  //       .json({ status: 'error', message: 'Some processes are not online' });
  //   });
  // });
});

app.listen(config.port, () => {
  console.log(`HTTP server running on port ${config.port}`);
});
