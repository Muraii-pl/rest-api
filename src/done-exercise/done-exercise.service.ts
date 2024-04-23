import {
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  DATA_SOURCE,
  DONE_EXERCISES,
  EXERCISES_REPOSITORY,
} from '../common/constants/constants';
import {
  DataSource,
  In,
  Repository,
} from 'typeorm';
import { DoneExerciseEntity } from './done-exercise.entity';
import {
  CreateDoneExerciseDto,
  GetDoneExerciseResponseDto,
} from './dtos';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { IRawDoneTraining } from './interfaces';
import { UpdateDoneExerciseDto } from './dtos/update-done-exercise.dto';

@Injectable()
export class DoneExerciseService {

  constructor(
    @Inject(DONE_EXERCISES)
    private readonly _doneExerciseRepository: Repository<DoneExerciseEntity>,
    @Inject(DATA_SOURCE)
    private readonly _dataSource: Repository<DataSource>,
  ) {
  }

  public async getDoneExerciseById(id: number): Promise<DoneExerciseEntity> {
    return this._doneExerciseRepository.findOneBy({ id: id });
  }

  public async createDoneExercise(userId: number, exercisesData: CreateDoneExerciseDto[]): Promise<any> {

    const doneExercise = exercisesData.map((exercise) => {
      return this._doneExerciseRepository.create({
        userId: userId,
        exerciseId: exercise.exerciseId,
        pause: exercise.pause,
        load: exercise.load,
      });
    });

    await this._doneExerciseRepository.save(doneExercise);
  }


  public async getDoneExercise(userId: number, exerciseIds: number[]): Promise<GetDoneExerciseResponseDto[]> {
    const resultDoneExercise = await this._doneExerciseRepository.createQueryBuilder('de')
      .select('lde.pause', 'pause')
      .addSelect('lde.load', 'load')
      .addSelect('lde.exercise_id', 'exercise_id')
      .addSelect('lde.row_number', 'row')
      .addSelect('e.name', 'name')
      .addSelect('lde.created_at', 'created_at')
      .addSelect('lde.max', 'max')
      .innerJoin((subQuery) => {

        return subQuery
          .subQuery()
          .select('e.exercise_id', 'exercise_id')
          .addSelect('e.id', 'id')
          .addSelect('e.pause', 'pause')
          .addSelect('e.load', 'load')
          .addSelect('e.created_at', 'created_at')
          .addSelect('MAX(e.created_at)', 'max')
          .from(DoneExerciseEntity, 'e')
          .where({ userId: userId })
          .andWhere({ exerciseId: In(exerciseIds) });
      }, 'lde', 'lde.id = de.id')
      .leftJoin(ExercisesEntity, 'e', 'lde.exercise_id = e.id')
      .orderBy('lde.exercise_id')
      .where(`lde.row_number <= 3`)
      .getRawMany();

    return resultDoneExercise.reduce((previousValue: GetDoneExerciseResponseDto[], currentValue: IRawDoneTraining) => {
      const fIndex = previousValue.findIndex((item) => item.exerciseId === currentValue.exercise_id);
      if (fIndex > -1) {
        previousValue[fIndex].results.push({
          load: currentValue.load,
          pause: currentValue.pause,
          createdAt: currentValue.created_at,
        });
        return previousValue;
      }
      previousValue.push(
        {
          exerciseId: currentValue.exercise_id,
          name: currentValue.name,
          results: [{
            load: currentValue.load,
            pause: currentValue.pause,
            createdAt: currentValue.created_at,
          }],
        },
      );
      return previousValue;
    }, []);
  }

  public async getLastUserDoneExercises(userId: number): Promise<any[]> {
    const subQuery = await this._doneExerciseRepository.createQueryBuilder('ed')
      .select(`DATE_TRUNC('day', MAX("created_at"))`, 'created_at')
      .where({ userId: userId })
      .getRawOne();

    const lastDoneExercise = await this._doneExerciseRepository.createQueryBuilder('de')
      .select('e.name', 'name')
      .addSelect('de.load', 'load')
      .addSelect('de.exercise_id', 'exerciseId')
      .addSelect('e.unit', 'unit')
      .addSelect(`DATE_TRUNC('day', de.created_at)`, 'createdAt')
      .where(`DATE_TRUNC('day', de.created_at) = :createdAt`, { createdAt: subQuery.created_at })
      .leftJoin(ExercisesEntity, 'e', 'de.exercise_id = e.id')
      .getRawMany();
    return lastDoneExercise.reduce((prevValue, nextValue) => {
      const fExercise = prevValue.find((exercise) => exercise.exerciseId === nextValue.exerciseId);
      if (fExercise) {
        fExercise.loads.push(nextValue.load + nextValue.unit);
        return prevValue;
      }

      return [
        ...prevValue,
        {
          exerciseId: nextValue.exerciseId,
          name: nextValue.name,
          loads: [nextValue.load + nextValue.unit],
          createdAt: new Date(nextValue.createdAt).toISOString().slice(0, 10),
        },
      ];
    }, []);
  }

  public async updateDoneExercise(doneExercises: UpdateDoneExerciseDto[]): Promise<void> {
    const updatedExercises: Promise<DoneExerciseEntity[]> = Promise.all(
      doneExercises.map(async (doneExercise): Promise<DoneExerciseEntity> => {
        const updatedDoneExercise = await this.getDoneExerciseById(doneExercise.id);

        return Object.assign(doneExercise, updatedDoneExercise);
      }),
    );

    await this._doneExerciseRepository.save(await updatedExercises);
  }

  public async deleteDoneExercise(id: number): Promise<void> {
    await this._doneExerciseRepository.delete({ id });
  }
}
