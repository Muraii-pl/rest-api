import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateDoneExerciseDto {

  @ApiProperty({
    type: 'number',
    name: 'exerciseId'
  })
  @IsNumber()
  public readonly exerciseId: number;

  @ApiProperty({
    type: 'number',
    name: 'load'
  })
  @IsNumber()
  public readonly load: number;

  @ApiProperty({
    type: 'string',
    name: 'pause'
  })
  @IsNumber()
  public readonly pause: string;
}
