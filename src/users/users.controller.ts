import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { UpdateUserDto } from './dtos';
import { GetUserDto } from './dtos/get-user.dto';

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post(':id/update')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetUserDto,
    description: 'Return updated user data'
  })
  public async update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto): Promise<GetUserDto> {
    return await this.userService.updateUser(+id, userUpdateDto);
  }
}
