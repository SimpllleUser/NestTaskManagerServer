import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PriorityTask } from './priority-task.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';

export type Priority = {
  name: string;
  value: number;
};

@Injectable()
export class PriorityTaskService {
  constructor(
    @InjectModel(PriorityTask)
    private priorityTaskRepository: typeof PriorityTask,
  ) {}

  async create(dto: CreateTypeTaskDto) {
    const priorityTask = await this.priorityTaskRepository.create(dto);
    return priorityTask;
  }

  async findAll() {
    const priorityTasks = await this.priorityTaskRepository.findAll();
    return priorityTasks;
  }

  async getTypeByName(name) {
    const priorityTasks = await this.priorityTaskRepository.findOne({
      where: { name },
    });
    return priorityTasks;
  }

  async initPriorities(): Promise<void> {
    const priorities = await this.findAll();
    const notExistPriorities = this.getNotExistPriority(priorities);
    if (!notExistPriorities?.length) return;
    await Promise.all(
      notExistPriorities.map((priority: Priority) => this.create(priority)),
    );
  }

  getNotExistPriority(existTypes) {
    const types: Priority[] = [
      { name: 'HIGH', value: 4 },
      { name: 'NORMAL', value: 3 },
      { name: 'LOW', value: 1 },
    ];
    const notExistsPriority = types.filter(
      (type) => !existTypes.find(({ name }) => type === name),
    );
    return notExistsPriority;
  }
}
