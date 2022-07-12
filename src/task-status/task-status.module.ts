import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.model';

@Module({
  providers: [TaskStatusService],
  imports: [SequelizeModule.forFeature([TaskStatus])],
  exports: [TaskStatusService],
})
export class TaskStatusModule {}
