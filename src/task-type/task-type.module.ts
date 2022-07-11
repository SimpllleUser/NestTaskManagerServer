import { Module } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskType } from './task-type.model';

@Module({
  providers: [TaskTypeService],
  imports: [SequelizeModule.forFeature([TaskType])],
  exports: [TaskTypeService],
})
export class TypeTaskModule {}
