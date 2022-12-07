import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { STATUS } from 'src/utils/constants';
import { OptionGeneralService } from 'src/general-option/option-general.service';

@Injectable()
export class ProjectStatusService extends OptionGeneralService {
  constructor(
    @InjectModel(ProjectStatus)
    projectStatusRepository,
  ) {
    super(
      [STATUS.LOW, STATUS.NORMAL, STATUS.MEDIUM, STATUS.HIGHT],
      projectStatusRepository,
    );
  }
}
