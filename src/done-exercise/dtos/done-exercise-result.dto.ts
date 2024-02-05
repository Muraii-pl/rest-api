import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class DoneExerciseResultDto {
  @ApiProperty({
    name: 'load',
    type: 'number',
  })
  @IsString()
  @Expose()
  public readonly load: number;

  @ApiProperty({
    name: 'pause',
    type: 'string',
  })
  @IsNumber()
  @Expose()
  public readonly pause: string;

  @ApiProperty({
    name: 'createdAt',
    type: 'string',
  })
  @IsString()
  @Expose()
  public readonly createdAt: string;
}
