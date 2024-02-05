import {
  DATA_SOURCE,
  USERS_REPOSITORY,
} from '../common/constants/constants';
import { DataSource } from 'typeorm';
import { UsersEntity } from './users.entity';

export const UsersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UsersEntity),
    inject: [DATA_SOURCE],
  },
];
