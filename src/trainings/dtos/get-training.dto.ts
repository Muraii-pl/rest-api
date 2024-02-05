import { CreateTrainingDto } from './create-training.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetTrainingDto extends CreateTrainingDto {
  @ApiProperty({
    name: 'id',
    type: 'number'
  })
  @Expose()
  @IsNumber()
  public readonly id: number;
}
