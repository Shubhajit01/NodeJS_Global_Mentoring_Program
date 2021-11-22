import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { User } from '../user/user.entity';

export const connectDB = (options?: ConnectionOptions): Promise<Connection> => {
  return createConnection(
    options ?? {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      synchronize: true,
      entities: [User],
    }
  );
};
