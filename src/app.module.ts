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
import { TaskStatusModule } from './task-status/task-status.module';
import { TaskStatus } from './task-status/task-status.model';
import { ProjectModule } from './project/project.module';
import { ProjectTask } from './project/models/project-tasks';
import { Project } from './project/project.model';
import { ProjectTeam } from './project/models/project-team';
import { ProjectStatus } from './project/project-status/project-status.model';
import { ProjectStatusModule } from './project/project-status/project-status.module';
import { TaskType } from './task-type/task-type.model';
import { TaskPriority } from './task-priority/task-priority.model';
import { TaskPriorityModule } from './task-priority/task-priority.module';
import { ProjectComment } from './project/project-comment/project-comment.model';
import { TaskComment } from './task/task-comment/task-comment.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
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
        ProjectComment,
        TaskComment,
        TaskPriority,
        ProjectStatus,
        ProjectTask,
        ProjectTeam,
        TaskType,
        TaskStatus,
        User,
        Role,
        UserRoles,
        Task,
        Project,
      ],
    }),
    TaskPriorityModule,
    TaskStatusModule,
    ProjectModule,
    UsersModule,
    RolesModule,
    AuthModule,
    TasksModule,
    TaskStatusModule,
    ProjectModule,
    ProjectStatusModule,
  ],
})
export class AppModule {}
