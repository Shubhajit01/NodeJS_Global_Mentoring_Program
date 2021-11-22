import express from 'express';
import morgan from 'morgan';
import env from 'dotenv';

import { userRouter } from './user/user.route';
import { connectDB } from './db/connection';

const routes = [
  {
    path: '/user',
    router: userRouter,
  },
];

export default async (app: express.Application) => {
  env.config();
  
  const connection = await connectDB();
  await connection.synchronize();

  console.log('Connected to database');

  app.use(morgan('dev'));
  app.use(express.json());

  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};
