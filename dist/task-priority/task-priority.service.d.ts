import { TaskPriority } from './task-priority.model';
import { OptionGeneralService } from 'src/general-option/option-general.service';
export declare type Priority = {
    name: string;
    value: number;
};
export declare class TaskPriorityService extends OptionGeneralService {
    constructor(taskPriorityaskRepository: typeof TaskPriority);
}
