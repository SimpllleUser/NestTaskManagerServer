import { Module } from '@nestjs/common';
import { TaskPriorityService } from './task-priority.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskPriority } from './task-priority.model';

@Module({
  providers: [TaskPriorityService],
  imports: [SequelizeModule.forFeature([TaskPriority])],
  exports: [TaskPriorityService],
})
export class PriorityTaskModule {}
