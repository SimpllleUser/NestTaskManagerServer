import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../project.model';
import { ProjectComment } from './project-comment.model';
import { ProjectCommentService } from './project-comment.service';

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
