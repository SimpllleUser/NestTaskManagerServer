import { Module } from '@nestjs/common';
import { PriorityTaskService } from './priority-task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriorityTask } from './priority-task.model';

@Module({
  providers: [PriorityTaskService],
  imports: [SequelizeModule.forFeature([PriorityTask])],
  exports: [PriorityTaskService],
})
export class PriorityTaskModule {}
