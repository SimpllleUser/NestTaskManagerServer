import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../task.model';
import { TaskComment } from './task-comment.model';
import { TaskCommentService } from './task-comment.service';

@Module({
  providers: [TaskCommentService],
  imports: [SequelizeModule.forFeature([Task, TaskComment])],
  exports: [TaskCommentService],
})
export class TaskCommentModule {}
