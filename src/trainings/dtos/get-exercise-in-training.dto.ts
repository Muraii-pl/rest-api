import { ApiProperty } from '@nestjs/swagger';
import { ExercisesInTrainingDto } from '../../exercises-in-trainings/dtos';

export class GetExerciseInTrainingDto extends ExercisesInTrainingDto {

  @ApiProperty({
    type: 'string',
    name: 'unit',
  })
  public readonly unit: string;
}
