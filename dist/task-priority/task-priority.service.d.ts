import { TaskPriority } from './task-priority.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';
export declare type Priority = {
    name: string;
    value: number;
};
export declare class TaskPriorityService {
    private taskPriorityaskRepository;
    constructor(taskPriorityaskRepository: typeof TaskPriority);
    private priorities;
    create(dto: CreateTypeTaskDto): Promise<TaskPriority>;
    findAll(): Promise<TaskPriority[]>;
    findOne(id: number): Promise<TaskPriority>;
    getTypeByName(name: any): Promise<TaskPriority>;
    onModuleInit(): Promise<void>;
    initPriorities(): Promise<void>;
    getNotExistPriority(existTypes: any): Priority[];
    existPriority(id: number): Priority;
}
