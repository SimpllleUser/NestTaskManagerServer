import { Module } from '@nestjs/common';
import { TypeTaskService } from './type-task.service';
import { TypeTaskController } from './type-task.controller';

@Module({
  providers: [TypeTaskService],
  controllers: [TypeTaskController],
})
export class TypeTaskModule {}
