import 'reflect-metadata';
import express from 'express';
import init from './init';

const startServer = async () => {
  const app = express();
  await init(app);

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
};

startServer();
