import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsString,
} from 'class-validator';
import { CreateExercisesInTrainingsDto } from '../../exercises-in-trainings/dtos';

export class CreateExerciseDto {
  @ApiProperty({
    type: 'string',
    name: 'name',
  })
  @Expose()
  @IsString()
  public readonly name: string;

  @ApiProperty({
    type: 'string',
    name: 'description',
  })
  @Expose()
  @IsString()
  public readonly description: string;

  @ApiProperty({
    type: 'string',
    name: 'unit',
  })
  @Expose()
  @IsString()
  public readonly unit: string;

  @ApiProperty({
    type: CreateExercisesInTrainingsDto,
    name: 'exercises',
    isArray: true
  })
  @Expose()
  @IsArray()
  public readonly exercises: CreateExercisesInTrainingsDto[];
}
