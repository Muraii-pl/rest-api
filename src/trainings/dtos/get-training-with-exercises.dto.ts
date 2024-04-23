import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  Expose,
} from 'class-transformer';
import { GetExerciseInTrainingDto } from './get-exercise-in-training.dto';
import { GetTrainingDto } from './get-training.dto';

export class GetTrainingWithExercisesDto extends GetTrainingDto {
  @ApiProperty({
    type: GetExerciseInTrainingDto,
    name: 'exercises',
    isArray: true,
  })
  @Expose()
  exercises: GetExerciseInTrainingDto[];
}
