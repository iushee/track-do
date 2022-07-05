import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false, unique: false }) firstname: string;
  @Column({ type: 'varchar', nullable: false, unique: false }) lastname: string;
  @Column({ type: 'varchar', nullable: false, unique: true }) username: string;
  @Column({ type: 'varchar', nullable: false }) password: string;
  @Column({ type: 'varchar', nullable: false }) email: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @OneToMany(type => Task, task => task.createdBy)
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
  }

  toDto(): UserDto {
    return {
        "id": this.id,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "email": this.email,
        "username": this.username,
        "createdOn": this.createdOn
    }
  }
}
