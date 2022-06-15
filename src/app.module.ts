import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.model';
import { StatusTaskModule } from './status-task/status-task.module';
import { StatusTask } from './status-task/status-task.model';
import { ProjectModule } from './project/project.module';
import { ProjectTasks } from './project/models/project-tasks';
import { Project } from './project/project.model';
import { ProjectTeam } from './project/models/project-team';
import { StatusProject } from './status-project/status-project.model';
import { StatusProjectModule } from './status-project/status-project.module';
import { TypeTask } from './type-task/type-task.model';
import { PriorityTask } from './priority-task/priority-task.model';
import { PriorityTaskModule } from './priority-task/priority-task.module';

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
