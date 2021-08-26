import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Task } from '../tasks/task.model';
import { MailModule } from '../mailer/mail.module';
import { MailService } from '../mailer/mail.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Task]),
    RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
