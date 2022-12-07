import { TaskType } from './task-type.model';
import { OptionGeneralService } from 'src/general-option/option-general.service';
export declare type Type = {
    name: string;
    value: number;
};
export declare class TaskTypeService extends OptionGeneralService {
    constructor(taskTypeRepository: typeof TaskType);
}
