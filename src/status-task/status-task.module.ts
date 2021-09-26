import { Module } from '@nestjs/common';
import { StatusTaskService } from './status-task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusTask } from './status-task.model';

@Module({
  providers: [StatusTaskService],
  imports: [SequelizeModule.forFeature([StatusTask])],
  exports: [StatusTaskService],
})
export class StatusTaskModule {}
