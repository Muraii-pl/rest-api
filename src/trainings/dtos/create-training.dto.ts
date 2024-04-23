import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeekEnum } from '../../common/enums';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
} from 'class-validator';
import {
  ExercisesInTrainingDto,
} from '../../exercises-in-trainings/dtos';

export class CreateTrainingDto {

  @ApiProperty({
    type: 'enum',
    enum: DayOfWeekEnum,
    name: 'dayOfWeek',
  })
  @IsEnum(DayOfWeekEnum)
  @Expose()
  public readonly dayOfWeek: DayOfWeekEnum;

  @ApiProperty({
    name: 'isRecurrent',
    type: 'boolean',
  })
  @Expose()
  @IsBoolean()
  public readonly isRecurrent: boolean;

  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  @Expose()
  @IsString()
  public readonly name: string;

  @ApiProperty({
    name: 'exercises',
    type: ExercisesInTrainingDto,
    isArray: true
  })
  @Expose()
  @IsArray()
  public readonly exercises: ExercisesInTrainingDto[];
}
