import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './task/task.module';
import { Task } from './task/task.model';
import { StatusTaskModule } from './task-status/task-status.module';
import { StatusTask } from './task-status/task-status.model';
import { ProjectModule } from './project/project.module';
import { ProjectTasks } from './project/models/project-tasks';
import { Project } from './project/project.model';
import { ProjectTeam } from './project/models/project-team';
import { StatusProject } from './project-status/project-status.model';
import { StatusProjectModule } from './project-status/project-status.module';
import { TypeTask } from './task-type/task-type.model';
import { PriorityTask } from './task-priority/task-priority.model';
import { PriorityTaskModule } from './task-priority/task-priority.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
    SequelizeModule.forRoot({
      host: '0.0.0.0',
      password: '',
      dialect: 'sqlite',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      storage: './db.sqlite',
      autoLoadModels: true,
      models: [
        PriorityTask,
        StatusProject,
        Project,
        ProjectTasks,
        ProjectTeam,
        TypeTask,
        StatusTask,
        User,
        Role,
        UserRoles,
        Task,
      ],
    }),
    PriorityTaskModule,
    StatusProjectModule,
    ProjectModule,
    UsersModule,
    RolesModule,
    AuthModule,
    TasksModule,
    StatusTaskModule,
    ProjectModule,
  ],
})
export class AppModule {}
