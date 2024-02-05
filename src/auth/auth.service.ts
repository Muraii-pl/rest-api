import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  RegisterDto,
  SignInDto,
} from './dtos';
import {
  comparePassword,
  hashPassword,
} from '../utils/bcrypt.utils';
import { PostgresErrorCode } from '../common/constants/database-constraints';
import {
  IAuthToken,
} from '../common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {
  }

  public async signIn({ login, password }: SignInDto): Promise<any> {
    try {
      const user = login.includes('@') ? await this._userService.findByEmail(login) : await this._userService.findByUsername(login);

      await comparePassword(password, user.password);

      const payload: IAuthToken = {
        id: user.id,
        username: user.username,
        password: user.password,
        expiryTime: new Date().addHours(1),
      };

      const token: string = await this._jwtService.signAsync(payload);

      await this._userService.updateAuthToken(user.id, token);

      return {
        id: user.id,
        username: user.username,
        authToken: token,
      };

    } catch (error) {
      throw new HttpException('Wrong Credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async register(registrationData: RegisterDto): Promise<Omit<CreateUserDto, 'password'>> {
    const hashedPassword = await hashPassword(registrationData.password);
    try {
      const createdUser = await this._userService.create({
        ...registrationData,
        password: hashedPassword,
      });

      delete createdUser.password;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async signOut(userId: number): Promise<void> {
    await this._userService.updateAuthToken(userId);
  }
}
