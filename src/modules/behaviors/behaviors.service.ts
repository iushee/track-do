import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Behavior } from './entities/behavior.entity';

@Injectable()
export class BehaviorsService {
    @InjectRepository(Behavior)
    private readonly repository: Repository<Behavior>;

    async findAll(): Promise<Behavior[]> {
        return await this.repository.find();
    }

    async findOne(id: number, userId: string): Promise<Behavior> {
        let behavior = await this.repository.findOne({
            relations: ['tasks'],
            "where": {
                "id": id,
                "tasks": {
                    "createdBy": {
                        "id": userId
                    }
                }
            }
        });
        if (behavior == null) {
            behavior = await this.repository.findOne({
                "where": {
                    "id": id
                }
            });
            behavior.tasks = [];
        }
        return behavior;
    }
}
