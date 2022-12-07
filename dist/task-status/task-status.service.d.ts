import { TaskStatus } from './task-status.model';
import { OptionGeneralService } from 'src/general-option/option-general.service';
export declare class TaskStatusService extends OptionGeneralService {
    constructor(taskStatusRepository: typeof TaskStatus);
}
