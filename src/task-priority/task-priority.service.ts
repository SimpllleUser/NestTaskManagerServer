import { Injectable } from '@nestjs/common';
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

  async getTypeByName(name) {
    const priorityTasks = await this.taskPriorityaskRepository.findOne({
      where: { name },
    });
    return priorityTasks;
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
