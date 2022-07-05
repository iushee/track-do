import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviorsController } from './behaviors.controller';
import { BehaviorsService } from './behaviors.service';
import { Behavior } from './entities/behavior.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Behavior])],
  controllers: [BehaviorsController],
  providers: [BehaviorsService],
})
export class BehaviorsModule {}
