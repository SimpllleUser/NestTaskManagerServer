import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from 'src/project/project.service';
import { TasksService } from './task.service';

@Injectable()
export class TaskAvailable implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private projectService: ProjectService,
    private taskService: TasksService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const taskId = req?.params?.id || req.body.taskId;
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const { id: userId } = await this.jwtService.verify(token);
      const { projectId } = await this.taskService.findOne(taskId);
      const projects = await this.projectService.userExistOnProject({
        projectId,
        userId,
      });
      const exitsProject = Boolean(projects?.length);
      console.log(taskId);
      if (taskId)
        new ConflictException({ message: 'User not have access to task' });
      return exitsProject;
    } catch (e) {
      new ConflictException({ message: 'User not have access to task' });
    }
  }
}
