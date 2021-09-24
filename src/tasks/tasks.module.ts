import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from '../users/users.model';
import { TypeTask } from '../type-task/type-task-model';
import { Project } from '../project/project.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([TypeTask, Task, Project])],
})
export class TasksModule {}
