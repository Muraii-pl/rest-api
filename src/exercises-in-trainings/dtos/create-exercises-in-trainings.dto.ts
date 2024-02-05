import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
} from 'class-validator';
import { ExercisesInTrainingDto } from './exercises-in-training.dto';

export class CreateExercisesInTrainingsDto {
  @ApiProperty({
    type: 'number',
    name: 'trainingId',
  })
  @IsNumber()
  public readonly trainingId: number;

  @ApiProperty({
    name: 'exercise',
    type: ExercisesInTrainingDto,
    isArray: true,
  })
  @IsArray()
  public readonly exercise: ExercisesInTrainingDto[];
}
