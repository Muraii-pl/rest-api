import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { USERS_REPOSITORY } from '../common/constants/constants';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import {
  CreateUserDto,
  UpdateUserDto,
} from './dtos';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly _userRepository: Repository<UsersEntity>,
  ) {
  }

  public async findByUsername(username: string): Promise<any> {
    return await this._userRepository.findOneBy({ username });
  }


  public async findByEmail(email: string): Promise<any> {
    return await this._userRepository.findOneBy({ email });
  }

  public async findAll(): Promise<any> {
    return await this._userRepository.find();
  }

  public async create(userData: CreateUserDto): Promise<any> {
    const newUser = await this._userRepository.create(userData);
    await this._userRepository.save(newUser);
    return newUser;
  }

  public async updateUser(id: number, updateData: UpdateUserDto): Promise<GetUserDto> {
    await this._userRepository.update({ id }, updateData);
    const user = await this._userRepository.findOneBy({ id });
    return user.toModel(GetUserDto);
  }

  public async updateAuthToken(id: number, authToken: string | null = null): Promise<void> {
    await this._userRepository.update({ id }, { authToken: authToken });
  }
}
