import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/user.decorator';
import { BehaviorsService } from './behaviors.service';
import { Behavior } from './entities/behavior.entity';

@Controller('behaviors')
export class BehaviorsController {
    constructor(private readonly behaviorsService: BehaviorsService) {}

    @Get()
    async findAllBehaviors(): Promise<Behavior[]>{
        return await this.behaviorsService.findAll()
    }

    @Get(':id')
    async findDetailsOfBehavior(@GetUser() user, @Param('id') id: number): Promise<Behavior> {
        return await this.behaviorsService.findOne(id, user.id);
    }
}
