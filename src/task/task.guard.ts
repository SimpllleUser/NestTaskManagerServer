import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TaskTypeService } from '../task-type/task-type.service';
import { TaskPriorityService } from '../task-priority/task-priority.service';

type ItemTask = {
  id: number;
  name: string;
  value: number;
};

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private typeTaskService: TaskTypeService,
    private priorityTaskService: TaskPriorityService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const reqBody = context.switchToHttp().getRequest().body;
      const priorities: ItemTask[] = await this.priorityTaskService.findAll();
      const types: ItemTask[] = await this.typeTaskService.findAll();
      const isValidType = types.some(({ id }) => id === reqBody.typeId);
      const isValidSPriority = priorities.some(
        ({ id }) => id === reqBody.priorityId,
      );
      return isValidSPriority && isValidType;
    } catch (error) {
      throw new HttpException('Invalid data fields', HttpStatus.BAD_REQUEST);
    }
  }
}
