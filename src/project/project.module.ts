import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/users.model';
import { Task } from '../tasks/task.model';
import { Project } from './project.model';
import { StatusProject } from '../project-status/project-status.model';
import { StatusProjectModule } from '../project-status/project-status.module';
import { UsersModule } from '../user/users.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    UsersModule,
    StatusProjectModule,
    SequelizeModule.forFeature([StatusProject, Project, User, Task]),
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
