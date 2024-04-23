import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrainingsEntity } from '../trainings/trainings.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';

@Entity('exercises_in_trainings')
export class ExercisesInTrainingsEntity {

  @Column({
    type: 'varchar',
    name: 'pause_between',
    nullable: true,
  })
  public readonly pauseBetween: string;

  @Column({
    type: 'varchar',
    name: 'pause_after',
    nullable: true,
  })
  public readonly pauseAfter: string;

  @Column({
    type: 'integer',
    name: 'warmup_series_qty',
    nullable: true
  })
  public readonly warmupSeriesQty: number;

  @Column({
    type: 'integer',
    name: 'rights_series_qty',
  })
  public readonly rightSeriesQty: number;

  @Column({
    type: 'varchar',
    name: 'pace',
    length: 4
  })
  public readonly pace: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

  @ManyToOne(() => TrainingsEntity, (training) => training.id, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'training_id' })
  @PrimaryColumn({name: 'training_id'})
  public readonly trainingId: number;

  @ManyToOne(() => ExercisesEntity, (exercise) => exercise.id, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'exercise_id' })
  @PrimaryColumn({ name: 'exercise_id' })
  public readonly exerciseId: number;

}
