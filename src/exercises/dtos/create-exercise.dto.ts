import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

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
}
