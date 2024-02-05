import {
  DATA_SOURCE,
  TRAININGS_REPOSITORY,
} from '../common/constants/constants';
import { DataSource } from 'typeorm';
import { TrainingsEntity } from './trainings.entity';

export const TrainingsProvider = [
  {
    provide: TRAININGS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TrainingsEntity),
    inject: [DATA_SOURCE],
  },
];
