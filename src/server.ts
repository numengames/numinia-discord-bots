import cors from 'cors';
import {
  initExpressLogger,
  createLoggerHandler,
} from '@numengames/numinia-logger';
import pm2, { ProcessDescription } from 'pm2';
import express, { Request, Response } from 'express';

import config from './config';

const app = express();

app.use(cors());

initExpressLogger(config.logger, app);
const loggerHandler = createLoggerHandler('numinia-discord-bots');

app.get('/health', (_req: Request, res: Response) => {
  pm2.connect((error: unknown) => {
    if (error) {
      loggerHandler.logError('Failed to connect to PM2:', error as Error);
      return res
        .status(500)
        .json({ status: 'error', message: 'Failed to connect to PM2' });
    }

    pm2.list((error: unknown, list) => {
      pm2.disconnect();
      if (error) {
        loggerHandler.logError('Failed to list PM2 processes:', error as Error);
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to list PM2 processes' });
      }

      const filteredList = list.filter(
        (proc: ProcessDescription) => !/commands/.test(proc.name as string),
      );

      const isHealthy = filteredList.every(
        (proc: ProcessDescription) => proc.pm2_env?.status === 'online',
      );

      if (isHealthy) {
        return res.status(200).send();
      }

      return res
        .status(500)
        .json({ status: 'error', message: 'Some processes are not online' });
    });
  });
});

app.listen(config.port, () => {
  loggerHandler.logInfo(`HTTP server running on port ${config.port}`);
});
