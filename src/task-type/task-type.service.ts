import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskType } from './task-type.model';
import { TYPE } from 'src/utils/constants';
import { OptionGeneralService } from 'src/general-option/option-general.service';

export type Type = {
  name: string;
  value: number;
};

@Injectable()
export class TaskTypeService extends OptionGeneralService {
  constructor(
    @InjectModel(TaskType)
    taskTypeRepository: typeof TaskType,
  ) {
    super([TYPE.LOW, TYPE.MEDIUM, TYPE.HIGHT], taskTypeRepository);
  }
}
