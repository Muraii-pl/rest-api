import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/entities/';
import { GenderEnum } from '../common/enums';
import { TrainingsEntity } from '../trainings/trainings.entity';
import { DoneExerciseEntity } from '../done-exercise/done-exercise.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {

  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  public authToken: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  surname: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  weight: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  height: number;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.NO_ANSWER,
  })
  gender: GenderEnum;

  @OneToMany(() => TrainingsEntity, (training: TrainingsEntity) => training.userId)
  @JoinColumn({ name: 'training_id' })
  trainingIds: number[];

  @OneToMany(() => DoneExerciseEntity,
    (doneExercise: DoneExerciseEntity) => doneExercise.userId)
  @JoinColumn({ name: 'user_id' })
  public readonly doneExercises: DoneExerciseEntity[];
}
