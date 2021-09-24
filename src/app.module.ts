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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        StatusProject,
        Project,
        ProjectTasks,
        ProjectTeam,
        StatusTask,
        User,
        Role,
        UserRoles,
        Task,
      ],
      autoLoadModels: true,
    }),
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
