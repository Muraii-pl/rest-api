import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  RegisterDto,
  SignInDto,
  SignInResponseDto,
} from './dtos';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
  ) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  public async register(@Body() registrationData: RegisterDto): Promise<Omit<CreateUserDto, 'password'>> {
    return await this._authService.register(registrationData);
  }


  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  @ApiOkResponse({
    type: SignInResponseDto,
  })
  @ApiBody({
    type: SignInDto
  })
  public async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    console.log(signInDto);
    return await this._authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('status')
  @ApiNoContentResponse({
    description: 'Check user identity',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  public async status(): Promise<void> {

  }


  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('signOut')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  public async signOut(@Req() { user: { id } }): Promise<void> {
    await this._authService.signOut(id);
  }
}
