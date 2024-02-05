import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({
      name: 'login',
      type: 'string',
      required: true,
    },
  )
  @IsString()
  public readonly login: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
  })
  @IsString()
  public readonly password: string;

}
