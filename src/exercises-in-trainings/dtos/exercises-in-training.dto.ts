import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class ExercisesInTrainingDto {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  @IsNumber()
  @Expose()
  public readonly id: number;

  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  @IsString()
  @Expose()
  public readonly name: string;

  @ApiProperty({
    name: 'pauseBetween',
    type: 'string',
  })
  @Expose()
  @IsString()
  public readonly pauseBetween: string;

  @ApiProperty({
    name: 'pauseAfter',
    type: 'string',
  })
  @IsString()
  @Expose()
  public readonly pauseAfter: string;

  @ApiProperty({
    name: 'pace',
    type: 'string',
  })
  @IsString()
  @Expose()
  public readonly pace: string;

  @ApiProperty({
    name: 'warmupSeriesQty',
    type: 'number',
  })
  @IsNumber()
  @Expose()
  public readonly warmupSeriesQty: number;

  @ApiProperty({
    name: 'rightSeriesQty',
    type: 'number',
  })
  @IsNumber()
  @Expose()
  public readonly rightSeriesQty: number;
}
