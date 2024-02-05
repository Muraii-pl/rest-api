import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/entities';
import { DoneExerciseEntity } from '../done-exercise/done-exercise.entity';
import { ExercisesInTrainingsEntity } from '../exercises-in-trainings/exercises-in-trainings.entity';

@Entity('exercises')
export class ExercisesEntity extends BaseEntity {

  @Column({
    name: 'name',
    type: 'varchar',
  })
  public readonly name: string;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  public readonly description: string;


  @Column({
    name: 'unit',
    type: 'varchar',
    nullable: true,
    default: false,
  })
  public readonly unit: string | null = null;

  @OneToMany(() => DoneExerciseEntity, (doneExercise: DoneExerciseEntity) => doneExercise.exerciseId)
  @JoinColumn({name: 'exercise_id'})
  public readonly doneExercises: ExercisesEntity[];

  @OneToMany(() => ExercisesInTrainingsEntity,
    (exercisesInTrainings) => exercisesInTrainings.exerciseId)
  @JoinColumn({ name: 'exercise_id' })
  public readonly exercisesInTrainings: ExercisesInTrainingsEntity[];
}
