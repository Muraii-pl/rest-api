import { ApiProperty } from '@nestjs/swagger';

export class GetExerciseInTrainingDto {
  @ApiProperty({
    type: 'string',
    name: 'exerciseName',
  })
  public readonly exerciseName: string;

  @ApiProperty({
    type: 'string',
    name: 'pause',
  })
  public readonly pause: string;

  @ApiProperty({
    type: 'string',
    name: 'unit',
  })
  public readonly unit: string;
}
