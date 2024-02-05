import {
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ExercisesModule } from './exercises/exercises.module';
import { DoneExerciseModule } from './done-exercise/done-exercise.module';
import { ExercisesInTrainingsModule } from './exercises-in-trainings/exercises-in-trainings.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true },
    ),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: `${parseInt(<string>process.env.JWT_EXPIRATION_TIME)}y` }
    }),
    UsersModule,
    AuthModule,
    TrainingsModule,
    ExercisesModule,
    DoneExerciseModule,
    ExercisesInTrainingsModule
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {
}
