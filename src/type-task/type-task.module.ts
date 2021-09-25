import { Module } from '@nestjs/common';
import { TypeTaskService } from './type-task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeTask } from './type-task.model';

@Module({
  providers: [TypeTaskService],
  imports: [SequelizeModule.forFeature([TypeTask])],
  exports: [TypeTaskService],
})
export class TypeTaskModule {}
