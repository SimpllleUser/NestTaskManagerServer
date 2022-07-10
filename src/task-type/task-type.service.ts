import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeTask } from './task-type.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';

export type Type = {
  name: string;
  value: number;
};

@Injectable()
export class TypeTaskService {
  constructor(
    @InjectModel(TypeTask)
    private typeTaskRepository: typeof TypeTask,
  ) {}

  async create(dto: CreateTypeTaskDto) {
    const typeTask = await this.typeTaskRepository.create(dto);
    return typeTask;
  }

  async findAll() {
    const typeTasks = await this.typeTaskRepository.findAll();
    return typeTasks;
  }

  async getTypeByName(name) {
    const typeTasks = await this.typeTaskRepository.findOne({
      where: { name },
    });
    return typeTasks;
  }

  async initTypes(): Promise<void> {
    const types = await this.findAll();
    const notExistTypes = this.getNotExistTypes(types);
    if (!notExistTypes?.length) return;
    await Promise.all(notExistTypes.map((type: Type) => this.create(type)));
  }

  getNotExistTypes(existTypes) {
    const types: Type[] = [
      { name: 'BUG', value: 4 },
      { name: 'FEATURE', value: 2 },
      { name: 'FIX', value: 3 },
      { name: 'PLANNING', value: 1 },
    ];
    const notExistsStatus = types.filter(
      (type) => !existTypes.find(({ name }) => type === name),
    );
    return notExistsStatus;
  }
}
