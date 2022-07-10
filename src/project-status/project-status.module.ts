import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusProject } from './project-status.model';
import { StatusProjectService } from './project-status.service';

@Module({
  providers: [StatusProjectService],
  imports: [SequelizeModule.forFeature([StatusProject])],
  exports: [StatusProjectService],
})
export class StatusProjectModule {}
