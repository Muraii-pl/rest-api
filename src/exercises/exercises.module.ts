import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { DatabaseModule } from '../lib/database/database.module';
import { ExercisesProvider } from './exercises.provider';
import { DoneExerciseModule } from '../done-exercise/done-exercise.module';

@Module({
  imports: [DatabaseModule, DoneExerciseModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ...ExercisesProvider],
  exports: [...ExercisesProvider]
})
export class ExercisesModule {
}
