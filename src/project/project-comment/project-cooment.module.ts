import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../project.model';
import { ProjectComment } from './project-cooment.model';
import { ProjectCommentService } from './project-cooment.service';
// import { TaskStatusService } from './task-status.service';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { TaskStatus } from './task-status.model';

@Module({
    providers: [ProjectCommentService],
    imports: [
      SequelizeModule.forFeature([
        Project,
        ProjectComment,
      ]),
    ],
  })
export class ProjectCommentModule {}
