import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { StatusTask } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { StatusTaskModule } from '../task-status/task-status.module';
import { TypeTask } from '../type-task/type-task.model';
import { TypeTaskModule } from '../type-task/type-task.module';
import { PriorityTask } from '../task-priority/task-priority.model';
import { PriorityTaskModule } from '../task-priority/task-priority.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    StatusTaskModule,
    TypeTaskModule,
    PriorityTaskModule,
    SequelizeModule.forFeature([
      PriorityTask,
      TypeTask,
      StatusTask,
      Task,
      Project,
    ]),
  ],
})
export class TasksModule {}
