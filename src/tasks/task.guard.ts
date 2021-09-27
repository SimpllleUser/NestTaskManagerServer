import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TypeTaskService } from '../type-task/type-task.service';
import { PriorityTaskService } from '../priority-task/priority-task.service';

type ItemTask = {
  id: number;
  name: string;
  value: number;
};

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private typeTaskService: TypeTaskService,
    private priorityTaskService: PriorityTaskService,
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
