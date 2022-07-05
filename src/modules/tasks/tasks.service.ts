import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../users/entitiy/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

    @InjectRepository(Task)
    private readonly repository: Repository<Task>;

    async findAll(userId: string): Promise<Task[]> {
        return await this.repository.find({
            "loadRelationIds": true,
            "where": {
                "createdBy": {
                    "id": userId
                }
            }
        });
    }

    async findAllByBehavior(behaviorId: number, userId: string): Promise<Task[]> {
        return await this.repository.find({
            "where": {
                "behavior": {
                    "id": behaviorId
                },
                "createdBy": {
                    "id": userId
                }
            }
        });
    }

    async findOne(id: number, userId: string): Promise<Task> {
        console.log(userId)
        return await this.repository.findOneOrFail({
            "where": {
                "id": id,
                "createdBy": {
                    "id": userId
                }
            },
            "loadRelationIds": true
        })
    }

    async create(taskData: CreateTaskDto, user: User): Promise<Task> {
        taskData.createdBy = user;
        return await this.repository.save(taskData)
    }

    async update(id: number, taskData: UpdateTaskDto, userId: string): Promise<UpdateResult> {
        return await this.repository.update({
            "id": id,
            "createdBy": {
                "id": userId
            }
        }, taskData);
    }

    async delete(id: number, userId: string): Promise<DeleteResult> {
        return await this.repository.delete({
            "id": id,
            "createdBy": {
                "id": userId
            }
        });
    }

}
