import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from 'src/project/project.service';
import { TasksService } from './task.service';
export declare class TaskAvailable implements CanActivate {
    private jwtService;
    private projectService;
    private taskService;
    constructor(jwtService: JwtService, projectService: ProjectService, taskService: TasksService);
    canActivate(context: ExecutionContext): Promise<any>;
}
