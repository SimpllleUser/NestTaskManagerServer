import { OnModuleInit } from '@nestjs/common';
import { ProjectStatus } from './project-status.model';
import { CreateStatusProjectDto } from './dto/create-project-status.dto';
export declare class ProjectStatusService implements OnModuleInit {
    private projectStatusRepository;
    constructor(projectStatusRepository: typeof ProjectStatus);
    create(dto: CreateStatusProjectDto): Promise<ProjectStatus>;
    getAll(): Promise<ProjectStatus[]>;
    findOne(id: number): Promise<ProjectStatus>;
    getStatusByName(name: any): Promise<ProjectStatus>;
    onModuleInit(): Promise<void>;
    getNotExistStatuses(existStatuses: any): {
        name: string;
        value: number;
    }[];
}
