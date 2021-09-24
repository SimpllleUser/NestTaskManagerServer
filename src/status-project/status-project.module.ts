import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusProject } from './status-project.model';
import { StatusProjectService } from './status-project.service';

@Module({
  providers: [StatusProjectService],
  imports: [SequelizeModule.forFeature([StatusProject])],
  exports: [StatusProjectService],
})
export class StatusProjectModule {}
