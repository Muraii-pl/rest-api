import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import {
  CreateExerciseDto,
  GetExerciseDto,
  UpdateExerciseDto,
} from './dtos';
import { DoneExerciseService } from '../done-exercise/done-exercise.service';
import {
  CreateDoneExerciseDto,
  GetDoneExerciseDto,
  GetDoneExerciseResponseDto,
  GetLastDoneExerciseResponseDto,
} from '../done-exercise/dtos';
import { UpdateDoneExerciseDto } from '../done-exercise/dtos/update-done-exercise.dto';

@Controller('exercise')
@ApiTags('Exercise')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ExercisesController {
  constructor(
    private readonly _exercisesService: ExercisesService,
    private readonly _doneExerciseService: DoneExerciseService,
  ) {
  }

  @Get('all')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetExerciseDto,
    description: 'Get exercise',
    isArray: true,
  })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
  })
  public async getExercise(@Query('searchTerm') searchTerm: string): Promise<GetExerciseDto[]> {

    return await this._exercisesService.getExercises(searchTerm);
  }

  @Get('done')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Get last three done exercise',
    type: GetDoneExerciseResponseDto,
    isArray: true,
  })
  public async getDoneExercise(
    @Req() { user: { id } },
    @Query() { exerciseIds }: GetDoneExerciseDto): Promise<GetDoneExerciseResponseDto[]> {
    return await this._doneExerciseService.getDoneExercise(id, exerciseIds);
  }

  @Get('done-last')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Get last done exercise',
    type: GetLastDoneExerciseResponseDto,
    isArray: true,
  })
  public async getLastUserDoneExercises(@Req() { user: { id } }): Promise<GetLastDoneExerciseResponseDto[]>  {
    return await this._doneExerciseService.getLastUserDoneExercises(id);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetExerciseDto,
    description: 'Get exercise by id',
  })
  public async getExerciseById(@Param('id') id: number): Promise<GetExerciseDto> {
    return await this._exercisesService.getExerciseById(id);
  }


  @Put('done/update')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Done exercise updated',
  })
  @ApiBody({
    description: 'List updated exercise',
    type: UpdateDoneExerciseDto,
    isArray: true,
  })
  public async updateDoneExercise(@Body() doneExercise: UpdateDoneExerciseDto[]): Promise<any> {
    return await this._doneExerciseService.updateDoneExercise(doneExercise);
  }

  @Post('create')
  @HttpCode(201)
  @ApiCreatedResponse({
    type: GetExerciseDto,
    description: 'Created exercise',
  })
  public async createExercise(@Body() exerciseData: CreateExerciseDto): Promise<GetExerciseDto> {
    return await this._exercisesService.createExercise(exerciseData);
  }

  @Put(':id/update')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetExerciseDto,
    description: 'Update exercise',
  })
  public async updateExercise(
    @Param('id') id: number,
    @Body() exerciseData: UpdateExerciseDto): Promise<GetExerciseDto> {

    return this._exercisesService.updateExercise(id, exerciseData);
  }

  @Post('end')
  @HttpCode(204)
  @ApiBody({
    type: CreateDoneExerciseDto,
    isArray: true,
  })
  @ApiNoContentResponse({
    description: 'Save done training',
  })
  public async createEndExercise(@Body() exerciseData: CreateDoneExerciseDto[], @Req() { user: { id } }): Promise<void> {
    await this._doneExerciseService.createDoneExercise(id, exerciseData);
  }

  @Delete('done/:id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'remove done exercise',
  })
  public async deleteDoneExercise(@Param('id') id: number): Promise<void> {
    await this._doneExerciseService.deleteDoneExercise(id);
  }
}
