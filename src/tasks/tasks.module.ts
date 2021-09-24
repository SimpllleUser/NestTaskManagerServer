import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { StatusTask } from '../status-task/status-task.model';
import { Project } from '../project/project.model';
import { StatusTaskModule } from '../status-task/status-task.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    StatusTaskModule,
    SequelizeModule.forFeature([StatusTask, Task, Project]),
  ],
})
export class TasksModule {}
