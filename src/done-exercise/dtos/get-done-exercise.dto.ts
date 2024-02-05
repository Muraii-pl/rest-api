import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

export class GetDoneExerciseDto {
  @ApiProperty({
    isArray: true,
    type: 'number'
  })
  @Transform(({ value }) => (Array.isArray(value)) ? value.map((item => +item)) : Array(+value) )
  @IsArray()
  public exerciseIds: number[];
}
