import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Expose,
} from 'class-transformer';
import { DoneExerciseResultDto } from './done-exercise-result.dto';

export class GetDoneExerciseResponseDto {

  @ApiProperty({
    name: 'exerciseId',
    type: 'number',
  })
  @IsNumber()
  @Expose()
  public readonly exerciseId: number;


  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  @Expose()
  public readonly name: string;

  @ApiProperty({
    name: 'results',
    type: DoneExerciseResultDto,
    isArray: true,
  })
  @Expose()
  public readonly results: DoneExerciseResultDto[];

}

export class GetLastDoneExerciseResponseDto {

  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  @Expose()
  public readonly name: string;

  @ApiProperty({
    name: 'createdAt',
    type: 'string',
  })
  @IsString()
  @Expose()
  public readonly createdAt: string;
}
