import { Module } from '@nestjs/common';
import { TypeTaskService } from './task-type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeTask } from './task-type.model';

@Module({
  providers: [TypeTaskService],
  imports: [SequelizeModule.forFeature([TypeTask])],
  exports: [TypeTaskService],
})
export class TypeTaskModule {}
