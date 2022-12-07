import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.model';
import { STATUS } from 'src/utils/constants';
import { OptionGeneralService } from 'src/general-option/option-general.service';

@Injectable()
export class TaskStatusService extends OptionGeneralService {
  constructor(
    @InjectModel(TaskStatus)
    taskStatusRepository: typeof TaskStatus,
  ) {
    super(
      [STATUS.LOW, STATUS.NORMAL, STATUS.MEDIUM, STATUS.HIGHT],
      taskStatusRepository,
    );
  }
}
