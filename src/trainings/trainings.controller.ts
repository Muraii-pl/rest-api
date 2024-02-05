import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTrainingDto,
  GetTrainingDto,
  GetTrainingWithExercisesDto,
  UpdateTrainingDto,
} from './dtos';
import { AuthGuard } from '../common/guards/auth.guard';
import { ExercisesInTrainingsService } from '../exercises-in-trainings/exercises-in-trainings.service';
import { CreateExercisesInTrainingsDto } from '../exercises-in-trainings/dtos';

@Controller('training')
@ApiTags('Training')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TrainingsController {
  constructor(
    private readonly _trainingsService: TrainingsService,
    @Inject(forwardRef(() => ExercisesInTrainingsService))
    private readonly _exercisesInTrainingsService: ExercisesInTrainingsService
    ) {
  }

  @Get('all')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetTrainingDto,
    description: 'Get user Trainings',
    isArray: true,
  })
  public async getUserTrainings(@Req() { user: { id } }): Promise<GetTrainingDto[]> {
    return await this._trainingsService.getUserTrainings(id);
  }


  @Get('nearest')
  @HttpCode(200)
  public async getNearestTraining(@Req() {user: { id }}): Promise<number> {
    return await this._trainingsService.getNearestTraining(id);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetTrainingWithExercisesDto,
  })
  public async exerciseInTraining(@Param('id') trainingId: number): Promise<GetTrainingWithExercisesDto> {
    return await this._trainingsService.getExerciseInTraining(trainingId);
  }


  @Post('create')
  @HttpCode(201)
  @ApiCreatedResponse({
    type: GetTrainingDto,
    description: 'Create user training',
  })
  public async createTraining(@Body() trainingData: CreateTrainingDto, @Req() { user: { id } }): Promise<GetTrainingDto> {
    return await this._trainingsService.createTraining(id, trainingData);
  }

  @Put(':id/update')
  @HttpCode(200)
  @ApiOkResponse({
    type: UpdateTrainingDto,
    description: 'Update training',
  })
  public async updateTraining(
    @Body() trainingData: UpdateTrainingDto,
    @Param('id') id: number
  ): Promise<GetTrainingDto> {

    return await this._trainingsService.updateTraining(id, trainingData);
  }

  @Delete(':id/delete')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Delete training',
  })
  public async deleteTraining(@Param('id') id: number): Promise<void> {
    return await this._trainingsService.deleteTraining(id);
  }

  @Post('add-exercise')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Add exercises to training',
  })
  public async add(@Body() { trainingId, exercise }: CreateExercisesInTrainingsDto): Promise<void> {
    return await this._exercisesInTrainingsService.addExerciseToTraining(trainingId, exercise);
  }

  @Delete(':id/remove-exercise')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Remove exercise from training',
  })
  @ApiQuery({
    name: 'exerciseId',
    required: true,
    type: 'number'
  })
  public async removeExerciseFromTraining(
    @Param('id') id: number,
    @Query('exerciseId') exerciseId: number
  ): Promise<void> {

    return await this._exercisesInTrainingsService.removeExerciseFromTraining(id, exerciseId);
  }


}
