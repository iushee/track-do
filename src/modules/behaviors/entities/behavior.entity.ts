import { Task } from "src/modules/tasks/entities/task.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('behaviors')
export class Behavior extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  description: string;

  @OneToMany(type => Task, task => task.behavior)
  tasks: Task[]
}
