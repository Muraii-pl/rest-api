import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TrainingsProvider } from './trainings.provider';
import { DatabaseModule } from '../lib/database/database.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { ExercisesInTrainingsModule } from '../exercises-in-trainings/exercises-in-trainings.module';

@Module({
  imports: [DatabaseModule, ExercisesModule, ExercisesInTrainingsModule],
  controllers: [TrainingsController],
  providers: [TrainingsService, ...TrainingsProvider],
  exports: [...TrainingsProvider]
})
export class TrainingsModule {
}
