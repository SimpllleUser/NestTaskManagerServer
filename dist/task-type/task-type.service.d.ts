import { TaskType } from './task-type.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';
export declare type Type = {
    name: string;
    value: number;
};
export declare class TaskTypeService {
    private taskTypeRepository;
    constructor(taskTypeRepository: typeof TaskType);
    types: Type[];
    create(dto: CreateTypeTaskDto): Promise<TaskType>;
    findAll(): Promise<TaskType[]>;
    findOne(id: number): Promise<TaskType>;
    getTypeByName(name: any): Promise<TaskType>;
    onModuleInit(): Promise<void>;
    initTypes(): Promise<void>;
    existType(id: number): Type;
    getNotExistTypes(existTypes: any): Type[];
}
