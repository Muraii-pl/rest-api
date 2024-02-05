import { Module } from '@nestjs/common';
import { DoneExerciseService } from './done-exercise.service';
import { DatabaseModule } from '../lib/database/database.module';
import { DoneExerciseProvider } from './done-exercise.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [DoneExerciseService, ...DoneExerciseProvider],
  exports: [DoneExerciseService]
})
export class DoneExerciseModule {}
