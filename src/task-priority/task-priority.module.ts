import { Module } from '@nestjs/common';
import { PriorityTaskService } from './task-priority.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriorityTask } from './task-priority.model';

@Module({
  providers: [PriorityTaskService],
  imports: [SequelizeModule.forFeature([PriorityTask])],
  exports: [PriorityTaskService],
})
export class PriorityTaskModule {}
