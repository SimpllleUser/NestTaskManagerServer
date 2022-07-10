import { Module } from '@nestjs/common';
import { StatusTaskService } from './task-status.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusTask } from './task-status.model';

@Module({
  providers: [StatusTaskService],
  imports: [SequelizeModule.forFeature([StatusTask])],
  exports: [StatusTaskService],
})
export class StatusTaskModule {}
