import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskPriority } from './task-priority.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';

export type Priority = {
  name: string;
  value: number;
};

@Injectable()
export class TaskPriorityService {
  constructor(
    @InjectModel(TaskPriority)
    private taskPriorityaskRepository: typeof TaskPriority,
  ) {}

  async create(dto: CreateTypeTaskDto) {
    const priorityTask = await this.taskPriorityaskRepository.create(dto);
    return priorityTask;
  }

  async findAll() {
    const priorityTasks = await this.taskPriorityaskRepository.findAll();
    return priorityTasks;
  }

  async findOne(id: number) {
    const priority = await this.taskPriorityaskRepository.findByPk(id);
    if (!priority) {
      throw new HttpException('not found priority', HttpStatus.NOT_FOUND);
    }
    return priority;
  }

  async getTypeByName(name) {
    const priority = await this.taskPriorityaskRepository.findOne({
      where: { name },
    });
    if (!priority) {
      throw new HttpException('not found priority', HttpStatus.NOT_FOUND);
    }
    return priority;
  }

  async onModuleInit(): Promise<void> {
    await this.initPriorities();
  }

  async initPriorities(): Promise<void> {
    const priorities = await this.findAll();
    const notExistPriorities = this.getNotExistPriority(priorities);
    if (priorities?.length) return;
    await Promise.all(
      notExistPriorities.map((priority: Priority) => this.create(priority)),
    );
  }

  getNotExistPriority(existTypes) {
    const types: Priority[] = [
      { name: 'hight', value: 1 },
      { name: 'normal', value: 2 },
      { name: 'low', value: 3 },
    ];
    const notExistsPriority = types.filter(
      (type) => !existTypes.find(({ name }) => type === name),
    );
    return notExistsPriority;
  }
}
