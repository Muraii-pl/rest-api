import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { ExercisesInTrainingsService } from './exercises-in-trainings.service';
import { DatabaseModule } from '../lib/database/database.module';
import { TrainingsModule } from '../trainings/trainings.module';
import { ExercisesInTrainingsProvider } from './exercises-in-trainings.provider';
import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => TrainingsModule), ExercisesModule],
  providers: [ExercisesInTrainingsService, ...ExercisesInTrainingsProvider],
  exports: [ExercisesInTrainingsService, ...ExercisesInTrainingsProvider],
})
export class ExercisesInTrainingsModule {
}
