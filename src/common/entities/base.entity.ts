import {
  CreateDateColumn,
  PrimaryGeneratedColumn,

  UpdateDateColumn,
} from 'typeorm';
import {
  ClassConstructor,
  plainToClass,
} from 'class-transformer';

export class BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP(0)' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  public updated_at: Date;


  public toModel<T>(dto: ClassConstructor<unknown>): T {
    return plainToClass(dto, this, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }) as T;
  }
}
