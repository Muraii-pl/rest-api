import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeekEnum } from '../../common/enums';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsString,
} from 'class-validator';

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
}
