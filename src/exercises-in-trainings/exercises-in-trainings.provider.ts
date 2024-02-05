import {
  DATA_SOURCE,
  EXERCISES_IN_TRAININGS,
} from '../common/constants/constants';
import { DataSource } from 'typeorm';
import { ExercisesInTrainingsEntity } from './exercises-in-trainings.entity';

export const ExercisesInTrainingsProvider = [
  {
    provide: EXERCISES_IN_TRAININGS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExercisesInTrainingsEntity),
    inject: [DATA_SOURCE],
  },
];
