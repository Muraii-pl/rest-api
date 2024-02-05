import * as process from 'process';
import { DATA_SOURCE } from '../constants/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [{
  provide: DATA_SOURCE,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_H0ST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        __dirname + '/../../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    });

    return dataSource.initialize();
  },
}];
