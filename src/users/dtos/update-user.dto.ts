import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';
import { GenderEnum } from '../../common/enums';

export class UpdateUserDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    name: 'surname',
    type: 'string',
  })
  @IsString()
  public readonly surname: string;

  @ApiProperty({
    name: 'weight',
    type: 'number',
  })
  @IsNumber()
  public readonly weight: number;

  @ApiProperty({
    name: 'height',
    type: 'number',
  })
  @IsNumber()
  public readonly height: number;

  @ApiProperty({
    name: 'gender',
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.NO_ANSWER
  })
  public readonly gender: GenderEnum;

}
