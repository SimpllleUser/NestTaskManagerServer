import {
    CanActivate,
    ConflictException,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { JwtService } from '@nestjs/jwt';
import { ProjectService } from './project.service';
  
  @Injectable()
  export class ProjectAvailable implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private projectService: ProjectService,
        ) {}
  
    async canActivate(
      context: ExecutionContext,
    ): Promise<any> {
      const req = context.switchToHttp().getRequest();
      const projectId = req?.params?.id || req.body.projectId;
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const { id } = this.jwtService.verify(token);
        const projects = await this.projectService.userExistOnProject({ projectId, userId: id });
        const exitsProject = Boolean(projects?.length);
        if (!exitsProject) new ConflictException({ message: 'User not have access to project' });
        return exitsProject;
      } catch (e) {
        new ConflictException({ message: 'User not have access to project' });
      }
    }
  }
  