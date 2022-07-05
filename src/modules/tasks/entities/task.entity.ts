import { Behavior } from "src/modules/behaviors/entities/behavior.entity";
import { User } from "src/modules/users/entitiy/user.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @ManyToOne(type => User, user => user.tasks)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(type => Behavior, behavior => behavior.tasks)
  @JoinColumn({ name: "behaviorId" })
  behavior: Behavior;
}
