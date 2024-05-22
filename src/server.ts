import express, { Request, Response } from 'express';

const app = express();

const PORT = 8000;

app.get('/health', (_req: Request, res: Response) => {
  res.send();
});

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
