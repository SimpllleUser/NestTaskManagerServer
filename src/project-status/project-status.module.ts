import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { ProjectStatusService } from './project-status.service';

@Module({
  providers: [ProjectStatusService],
  imports: [SequelizeModule.forFeature([ProjectStatus])],
  exports: [ProjectStatusService],
})
export class StatusProjectModule {}
