import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskPriority } from './task-priority.model';
import { PRIORITY } from 'src/utils/constants';
import { OptionGeneralService } from 'src/general-option/option-general.service';

export type Priority = {
  name: string;
  value: number;
};

@Injectable()
export class TaskPriorityService extends OptionGeneralService {
  constructor(
    @InjectModel(TaskPriority)
    taskPriorityaskRepository: typeof TaskPriority,
  ) {
    super(
      [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGHT],
      taskPriorityaskRepository,
    );
  }
}
