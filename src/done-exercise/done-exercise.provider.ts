import {
  DATA_SOURCE,
  DONE_EXERCISES,
} from '../common/constants/constants';
import { DataSource } from 'typeorm';
import { DoneExerciseEntity } from './done-exercise.entity';

export const DoneExerciseProvider = [
  {
    provide: DONE_EXERCISES,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DoneExerciseEntity),
    inject: [DATA_SOURCE],
  },
];
