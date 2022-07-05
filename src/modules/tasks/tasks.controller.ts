import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/user.decorator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../users/entitiy/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async findAllTasks(@GetUser() user: User): Promise<Task[]>{
        return await this.tasksService.findAll(user.id)
    }

    @Get(':id')
    async findDetailsOfTask(@GetUser() user: User, @Param('id') id: number): Promise<Task> {
        return await this.tasksService.findOne(id, user.id);
    }

    @Post('/create')
    async create(@GetUser() user: User, @Body() taskData: CreateTaskDto): Promise<Task> {
        return await this.tasksService.create(taskData, user);
    }

    @Put(':id')
    async update(@GetUser() user: User,@Param('id') id: number, @Body() taskData: UpdateTaskDto): Promise<UpdateResult> {
        return await this.tasksService.update(id, taskData, user.id);
    }

    @Delete(':id')
    async delete(@GetUser() user: User, @Param('id') id: number): Promise<DeleteResult> {
        return await this.tasksService.delete(id, user.id);
    }
}
