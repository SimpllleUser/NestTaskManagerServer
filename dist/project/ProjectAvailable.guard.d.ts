import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from './project.service';
export declare class ProjectAvailable implements CanActivate {
    private jwtService;
    private projectService;
    constructor(jwtService: JwtService, projectService: ProjectService);
    canActivate(context: ExecutionContext): Promise<any>;
}
