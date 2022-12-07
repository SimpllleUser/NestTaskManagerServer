import { OnModuleInit } from '@nestjs/common';
import { ProjectStatus } from './project-status.model';
import { CreateStatusProjectDto } from './dto/create-project-status.dto';
import { PropertyOption } from 'src/utils/constants';
export declare class ProjectStatusService implements OnModuleInit {
    private projectStatusRepository;
    constructor(projectStatusRepository: typeof ProjectStatus);
    private statuses;
    create(dto: CreateStatusProjectDto): Promise<ProjectStatus>;
    findAll(): Promise<ProjectStatus[]>;
    findOne(id: number): Promise<ProjectStatus>;
    getStatusByName(name: any): Promise<ProjectStatus>;
    onModuleInit(): Promise<void>;
    initStatuses(): Promise<void>;
    existStatus(id: number): boolean;
    getNotExistStatuses(existStatuses: any): PropertyOption[];
}
