import {
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  In,
  Repository,
} from 'typeorm';
import { TrainingsEntity } from './trainings.entity';
import {
  DATA_SOURCE,
  EXERCISES_IN_TRAININGS,
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
import { ExercisesInTrainingDto } from '../exercises-in-trainings/dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrainingsService {

  constructor(
    @Inject(DATA_SOURCE)
    private readonly _dataSource: DataSource,
    @Inject(TRAININGS_REPOSITORY)
    private readonly _trainingRepository: Repository<TrainingsEntity>,
    @Inject(EXERCISES_IN_TRAININGS)
    private readonly _exercisesInTrainingRepository: Repository<ExercisesInTrainingsEntity>,
  ) {
  }

  public async getUserTrainings(id: number): Promise<GetTrainingDto[]> {
    const userTrainings: TrainingsEntity[] = await this._trainingRepository.findBy({ userId: id });

    return userTrainings.map((training: TrainingsEntity) => training.toModel(GetTrainingDto));
  }

  public async getNearestTraining(userId: number): Promise<number> {

    const today = new Date().getDay();

    console.log(today);

    const nearestTraining = await this._trainingRepository.findOneBy({ userId: userId });
    return nearestTraining?.id ?? null;
  }


  public async getTrainingById(id: number): Promise<TrainingsEntity> {
    return await this._trainingRepository.findOneBy({ id });
  }

  public async createTraining(id: number, trainingData: CreateTrainingDto): Promise<any> {
    const training: Omit<CreateTrainingDto, 'exercises'> = {
      dayOfWeek: trainingData.dayOfWeek,
      isRecurrent: trainingData.isRecurrent,
      name: trainingData.name,
    };
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let savedTraining: TrainingsEntity;
    try {
      savedTraining = await queryRunner.manager.save(TrainingsEntity, { userId: id, ...training });

      for (let i = 0; i < trainingData.exercises.length; i++) {
        await queryRunner.manager.save(ExercisesInTrainingsEntity, {
          trainingId: savedTraining.id,
          exerciseId: trainingData.exercises[i].id,
          ...trainingData.exercises[i],
        });
      }
      await queryRunner.commitTransaction();

    } catch (e) {
      await queryRunner.rollbackTransaction();
      return e;
    } finally {
      await queryRunner.release();
      return await this.getExerciseInTraining(savedTraining.id);
    }
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
        'eit.pause_between as pause_between',
        'eit.pace as pace',
        'eit.pause_after as pause_after',
        'eit.warmup_series_qty as warmup_series_qty',
        'eit.rights_series_qty as rights_series_qty',
        'e.id as exercise_id',
        't.name AS training_name',
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
              id: currentValue.exercise_id,
              name: currentValue.exercise_name,
              pauseBetween: currentValue.pause_before,
              pauseAfter: currentValue.pause_after,
              pace: currentValue.pace,
              unit: currentValue.unit,
              warmupSeriesQty: currentValue.warmup_series_qty,
              rightSeriesQty: currentValue.rights_series_qty,
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
            id: currentValue.exercise_id,
            name: currentValue.exercise_name,
            pauseBetween: currentValue.pause_before,
            pauseAfter: currentValue.pause_after,
            pace: currentValue.pace,
            unit: currentValue.unit,
            warmupSeriesQty: currentValue.warmup_series_qty,
            rightSeriesQty: currentValue.rights_series_qty,
          },
        ],
      };
    }, null);
  }

  private createExerciseInTraining(trainingId: number, exercise: ExercisesInTrainingDto[]): any {
    return exercise.map((exercise) => ( {
      ...exercise,
      exerciseId: exercise.id,
      trainingId,
    } ));
  }
}
