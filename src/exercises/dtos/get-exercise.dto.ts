import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsNumber } from 'class-validator';

export class GetExerciseDto extends CreateExerciseDto {

  @ApiProperty({
    type: 'number',
    name: 'id',
  })
  @Expose()
  @IsNumber()
  public readonly id: number;


}
