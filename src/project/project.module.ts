import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Task } from '../tasks/task.model';
import { Project } from './project.model';
import { StatusProject } from '../status-project/status-project.model';
import { StatusProjectModule } from '../status-project/status-project.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    StatusProjectModule,
    SequelizeModule.forFeature([StatusProject, Project, User, Task]),
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
