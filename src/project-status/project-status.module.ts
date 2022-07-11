import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { StatusProjectService } from './project-status.service';

@Module({
  providers: [StatusProjectService],
  imports: [SequelizeModule.forFeature([ProjectStatus])],
  exports: [StatusProjectService],
})
export class StatusProjectModule {}
