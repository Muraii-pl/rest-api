import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ExercisesInTrainingsEntity } from './exercises-in-trainings.entity';
import {
  EXERCISES_IN_TRAININGS,
  EXERCISES_REPOSITORY,
  TRAININGS_REPOSITORY,
} from '../common/constants/constants';
import { Repository } from 'typeorm';
import { TrainingsEntity } from '../trainings/trainings.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ExercisesInTrainingDto } from './dtos';

@Injectable()
export class ExercisesInTrainingsService {

  constructor(
    @Inject(EXERCISES_REPOSITORY)
    private readonly _exerciseRepository: Repository<ExercisesEntity>,
    @Inject(EXERCISES_IN_TRAININGS)
    private readonly _exercisesInTrainingsRepository: Repository<ExercisesInTrainingsEntity>) {
  }

  public async addExerciseToTraining(trainingId: number, exercise: ExercisesInTrainingDto[]): Promise<void> {
    // const exercisesInTraining: ExercisesInTrainingsEntity[] = exercise.map((exercise: ExercisesInTrainingDto) => {
    //   return this._exercisesInTrainingsRepository.create({
    //     trainingId: trainingId,
    //     exerciseId: exercise.exerciseId,
    //     pause: exercise.pause,
    //   });
    // });
    // await this._exercisesInTrainingsRepository.save(exercisesInTraining);
  }

  public async removeExerciseFromTraining(trainingId: number, exerciseId: number): Promise<void> {
    await this._exercisesInTrainingsRepository.delete({ trainingId, exerciseId });
  }
}
