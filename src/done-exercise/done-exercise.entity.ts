import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../common/entities';
import { UsersEntity } from '../users/users.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';

@Entity('done_exercises')
export class DoneExerciseEntity extends BaseEntity {

  @Column({
    name: 'load',
    type: 'integer',
  })
  public readonly load: number;

  @Column({
    name: 'pause',
    type: 'varchar',
  })
  public readonly pause: string;

  @ManyToOne(() => UsersEntity, (users: UsersEntity) => users.doneExercises)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  public readonly userId: number;

  @ManyToOne(() => ExercisesEntity,
    (exercise: ExercisesEntity) => exercise.doneExercises)
  @JoinColumn({ name: 'exercise_id' })
  @Column({ name: 'exercise_id' })
  public readonly exerciseId: number;
}
