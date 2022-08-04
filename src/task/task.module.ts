import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskStatus } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { TaskStatusModule } from '../task-status/task-status.module';
import { TaskType } from '../task-type/task-type.model';
import { TypeTaskModule } from '../task-type/task-type.module';
import { TaskPriority } from '../task-priority/task-priority.model';
import { TaskPriorityModule } from '../task-priority/task-priority.module';
import { TaskCommentModule } from './task-comment/task-comment.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    TaskStatusModule,
    TypeTaskModule,
    TaskPriorityModule,
    TaskCommentModule, 
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
