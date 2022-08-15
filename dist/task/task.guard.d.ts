import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TaskTypeService } from '../task-type/task-type.service';
import { TaskPriorityService } from '../task-priority/task-priority.service';
export declare class TaskGuard implements CanActivate {
    private typeTaskService;
    private priorityTaskService;
    constructor(typeTaskService: TaskTypeService, priorityTaskService: TaskPriorityService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
