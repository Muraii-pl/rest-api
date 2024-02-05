import {
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  Repository,
} from 'typeorm';
import { TrainingsEntity } from './trainings.entity';
import {
  EXERCISES_REPOSITORY,
  TRAININGS_REPOSITORY,
} from '../common/constants/constants';
import {
  CreateTrainingDto,
  GetTrainingDto,
  GetTrainingWithExercisesDto,
  UpdateTrainingDto,
} from './dtos';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ExercisesInTrainingsEntity } from '../exercises-in-trainings/exercises-in-trainings.entity';
import { ITrainingWithExercisesRaw } from './interfaces';

@Injectable()
export class TrainingsService {

  constructor(
    @Inject(TRAININGS_REPOSITORY)
    private readonly _trainingRepository: Repository<TrainingsEntity>,
    @Inject(EXERCISES_REPOSITORY)
    private readonly _exerciseRepository: Repository<ExercisesEntity>,
  ) {
  }

  public async getUserTrainings(id: number): Promise<GetTrainingDto[]> {
    const userTrainings: TrainingsEntity[] = await this._trainingRepository.findBy({ userId: id });

    return userTrainings.map((training: TrainingsEntity) => training.toModel(GetTrainingDto));
  }

  public async getNearestTraining(userId: number): Promise<number> {

    const today = new Date().getDay();

    console.log(today);

    const nearestTraining =  await this._trainingRepository.findOneBy({ userId: userId });

    return nearestTraining.id
  }


  public async getTrainingById(id: number): Promise<TrainingsEntity> {
    return await this._trainingRepository.findOneBy({ id });
  }

  public async createTraining(id: number, trainingData: CreateTrainingDto): Promise<GetTrainingDto> {
    const newTraining: TrainingsEntity = this._trainingRepository.create({
      userId: id,
      ...trainingData,
    });
    await this._trainingRepository.save(newTraining);

    return newTraining.toModel(GetTrainingDto);
  }

  public async updateTraining(id: number, trainingData: UpdateTrainingDto): Promise<GetTrainingDto> {
    const training: TrainingsEntity = await this.getTrainingById(id);

    const newTrainingData = { ...training, ...trainingData };

    await this._trainingRepository.save(newTrainingData);

    return ( await this.getTrainingById(id) ).toModel(GetTrainingDto);
  }

  public async deleteTraining(id: number): Promise<void> {
    await this._trainingRepository.delete(id);
  }

  public async getExerciseInTraining(trainingId: number): Promise<GetTrainingWithExercisesDto> {

    const rawTraining: ITrainingWithExercisesRaw[] = await this._trainingRepository.createQueryBuilder('t')
      .select([
        't.id AS id',
        't.dayOfWeek as day_of_week',
        't.isRecurrent as is_recurrent',
        't.name AS training_name',
        'eit.pause AS pause',
        'e.name AS exercise_Name',
        'e.unit AS unit',
      ])
      .leftJoin(ExercisesInTrainingsEntity, 'eit', 't.id = eit.trainingId')
      .leftJoin(ExercisesEntity, 'e', 'e.id = eit.exerciseId')
      .where('t.id = :id', { id: trainingId })
      .orderBy('t.id')
      .getRawMany();

    return rawTraining.reduce((
      preValue: GetTrainingWithExercisesDto,
      currentValue: ITrainingWithExercisesRaw): GetTrainingWithExercisesDto => {

      if (preValue) {
        return {
          ...preValue,
          exercises: [
            ...preValue.exercises,
            {
              exerciseName: currentValue.exercise_name,
              pause: currentValue.pause,
              unit: currentValue.unit,
            },
          ],
        };
      }

      return {
        id: currentValue.id,
        dayOfWeek: currentValue.day_of_week,
        isRecurrent: currentValue.is_recurrent,
        name: currentValue.training_name,
        exercises: [
          {
            exerciseName: currentValue.exercise_name,
            pause: currentValue.pause,
            unit: currentValue.unit,
          },
        ],
      };
    }, null);
  }
}
