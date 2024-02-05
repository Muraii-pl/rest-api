import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { EXERCISES_REPOSITORY } from '../common/constants/constants';
import {
  ILike,
  Repository,
} from 'typeorm';
import { ExercisesEntity } from './exercises.entity';
import {
  CreateExerciseDto,
  UpdateExerciseDto,
  GetExerciseDto,
} from './dtos';

@Injectable()
export class ExercisesService {

  constructor(
    @Inject(EXERCISES_REPOSITORY)
    private readonly _exercisesRepository: Repository<ExercisesEntity>,
  ) {
  }

  public async getExerciseById(id: number): Promise<GetExerciseDto> {
    const exercise: ExercisesEntity = await this._exercisesRepository.findOneBy({ id });

    return await exercise.toModel(GetExerciseDto);
  }

  public async getExercises(searchTerm: string): Promise<GetExerciseDto[]> {
    searchTerm = searchTerm ? `%${ searchTerm }%` : '';

    let exercises: ExercisesEntity[];

    if (searchTerm) {
      exercises = await this._exercisesRepository.findBy({
        name: ILike(searchTerm),
        description: ILike(searchTerm),
      });
    } else {
      exercises = await this._exercisesRepository.find();
    }


    return exercises.map((exercise) => exercise.toModel(GetExerciseDto));
  }

  public async createExercise(exerciseData: CreateExerciseDto): Promise<GetExerciseDto> {
    const exercise: ExercisesEntity = await this._exercisesRepository.create(exerciseData);

    await this._exercisesRepository.save(exercise);

    return exercise.toModel(GetExerciseDto);
  }

  public async updateExercise(id: number, exerciseData: UpdateExerciseDto): Promise<GetExerciseDto> {
    let exercise: ExercisesEntity = await this._exercisesRepository.findOneBy({ id });

    exercise = Object.assign(exercise, exerciseData);
    await this._exercisesRepository.save(exercise);

    return this.getExerciseById(id);
  }


}
