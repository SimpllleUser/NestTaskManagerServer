import { CreateStatusProjectDto } from '../project/project-status/dto/create-project-status.dto';
import { TaskStatus } from './task-status.model';
export declare class TaskStatusService {
    private taskStatusRepository;
    constructor(taskStatusRepository: typeof TaskStatus);
    private statuses;
    create(dto: CreateStatusProjectDto): Promise<TaskStatus>;
    findAll(): Promise<TaskStatus[]>;
    findOne(id: number): Promise<TaskStatus>;
    getStatusByName(name: any): Promise<TaskStatus>;
    onModuleInit(): Promise<void>;
    existStatus(id: number): {
        name: string;
        value: number;
    };
    getNotExistStatuses(existStatuses: any): {
        name: string;
        value: number;
    }[];
}
