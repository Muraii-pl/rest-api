import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
      name: 'username',
      required: true,
    },
  )
  @IsString()
  public readonly username: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
  })
  @IsString()
  public readonly password: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
  })
  @IsEmail()
  public readonly email: string;


}
