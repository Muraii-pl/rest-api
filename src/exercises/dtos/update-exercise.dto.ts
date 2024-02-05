import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateExerciseDto {

  @ApiProperty({
    type: 'string',
    name: 'description',
  })
  @IsNotEmpty()
  @Expose()
  public readonly description: string;
}
