import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { StatusTask } from '../status-task/status-task.model';
import { Project } from '../project/project.model';
import { StatusTaskModule } from '../status-task/status-task.module';
import { TypeTask } from '../type-task/type-task.model';
import { TypeTaskModule } from '../type-task/type-task.module';
import { PriorityTask } from '../priority-task/priority-task.model';
import { PriorityTaskModule } from '../priority-task/priority-task.module';

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
