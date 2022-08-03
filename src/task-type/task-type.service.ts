import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskType } from './task-type.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';

export type Type = {
  name: string;
  value: number;
};

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectModel(TaskType)
    private taskTypeRepository: typeof TaskType,
  ) {}

  async create(dto: CreateTypeTaskDto) {
    const typeTask = await this.taskTypeRepository.create(dto);
    return typeTask;
  }

  async findAll() {
    const typeTasks = await this.taskTypeRepository.findAll();
    return typeTasks;
  }
  async findOne(id: number) {
    const type = await this.taskTypeRepository.findByPk(id);
    if (!type) {
      throw new HttpException('not found type', HttpStatus.NOT_FOUND)
    }
    return type;
  }

  async getTypeByName(name) {
    const type = await this.taskTypeRepository.findOne({
      where: { name },
    });
    if (!type) {
      throw new HttpException('not found type', HttpStatus.NOT_FOUND)
    }
    return type;
  }

  async onModuleInit(): Promise<void> {
    await this.initTypes();
  }

  async initTypes(): Promise<void> {
    const types = await this.findAll();
    const notExistTypes = this.getNotExistTypes(types);
    if (types?.length) return;
    await Promise.all(notExistTypes.map((type: Type) => this.create(type)));
  }

  getNotExistTypes(existTypes) {
    const types: Type[] = [
      { name: 'bug', value: 4 },
      { name: 'feature', value: 2 },
      { name: 'fix', value: 3 },
      { name: 'planning', value: 1 },
    ];
    const notExistsStatus = types.filter(
      (type) => !existTypes.find(({ name }) => type === name),
    );
    return notExistsStatus;
  }
}
