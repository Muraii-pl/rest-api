import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class ExercisesInTrainingDto {
  @ApiProperty({
    name: 'exerciseId',
    type: 'number'
  })
  @IsNumber()
  @Expose()
  public readonly exerciseId: number;

  @ApiProperty({
    name: 'pause',
    type: 'string'
  })
  @Expose()
  @IsString()
  public readonly pause: string;
}
