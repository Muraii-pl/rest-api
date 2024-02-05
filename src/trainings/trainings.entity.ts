import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/entities';
import { UsersEntity } from '../users/users.entity';
import { DayOfWeekEnum } from '../common/enums';
import { JoinColumn } from 'typeorm';
import { ExercisesInTrainingsEntity } from '../exercises-in-trainings/exercises-in-trainings.entity';

@Entity('tranings')
export class TrainingsEntity extends BaseEntity {

  @Column({
    type: 'enum',
    name: 'day_of_week',
    enum: DayOfWeekEnum,
  })
  public readonly dayOfWeek: DayOfWeekEnum;

  @Column({
    type: 'boolean',
    name: 'is_recurrent',
  })
  public readonly isRecurrent: boolean;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  public readonly name: string;

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.trainingIds)
  @JoinColumn({ name: 'user_id' })
  public readonly userId: number;

  @OneToMany(() => ExercisesInTrainingsEntity,
    (exercisesInTrainings) => exercisesInTrainings.exerciseId)
  @JoinColumn({ name: 'training_id' })
  public exercisesInTrainings: ExercisesInTrainingsEntity[];
}
