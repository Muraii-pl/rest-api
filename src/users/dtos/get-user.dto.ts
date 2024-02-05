import { GenderEnum } from '../../common/enums';
import {
  Expose,
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {

  @Expose()
  @ApiProperty()
  public readonly name: string;

  @Expose()
  @ApiProperty()
  public readonly surname: string;

  @Expose()
  @ApiProperty()
  public readonly weight: number;

  @Expose()
  @ApiProperty()
  public readonly height: number;

  @Expose()
  @ApiProperty({
    enum: GenderEnum,
    default: GenderEnum.NO_ANSWER
  })
  public readonly gender: GenderEnum;

}
