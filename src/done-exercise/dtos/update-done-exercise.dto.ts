import { DoneExerciseResultDto } from './done-exercise-result.dto';
import {
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateDoneExerciseDto extends PartialType(OmitType(DoneExerciseResultDto, ['createdAt'] as const)) {
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Expose()
  @IsNumber()
  public readonly id: number;
}
