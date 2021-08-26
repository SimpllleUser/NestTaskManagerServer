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
import { MailerModule } from 'nestjs-mailer';
import { MailModule } from './mailer/mail.module';

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
      models: [User, Role, UserRoles, Task],
      autoLoadModels: true,
    }),
    MailerModule.forRoot({
      config: {
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          ignoreTLS: false,
          secure: false,
          auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"Resume Maker" <pecehritsa.vv@gmail.com>',
        },
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    TasksModule,
    MailModule,
  ],
})
export class AppModule {}
