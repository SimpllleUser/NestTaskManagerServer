import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(dto: CreateTaskDto) {
    console.log('dto task', dto);
    const task = await this.taskRepository.create(dto);
    return task;
  }
}
