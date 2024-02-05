import {
  DATA_SOURCE,
  EXERCISES_REPOSITORY,
} from '../common/constants/constants';
import { DataSource } from 'typeorm';
import { ExercisesEntity } from './exercises.entity';

export const ExercisesProvider = [
  {
    provide: EXERCISES_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExercisesEntity),
    inject: [DATA_SOURCE],
  },
];
