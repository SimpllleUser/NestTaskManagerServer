import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskStatus } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { StatusTaskModule } from '../task-status/task-status.module';
import { TaskType } from '../task-type/task-type.model';
import { TypeTaskModule } from '../task-type/task-type.module';
import { TaskPriority } from '../task-priority/task-priority.model';
import { PriorityTaskModule } from '../task-priority/task-priority.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    StatusTaskModule,
    TypeTaskModule,
    PriorityTaskModule,
    SequelizeModule.forFeature([
      TaskPriority,
      TaskType,
      TaskStatus,
      Task,
      Project,
    ]),
  ],
})
export class TasksModule {}
