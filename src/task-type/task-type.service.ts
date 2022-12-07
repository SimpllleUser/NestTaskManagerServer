import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskType } from './task-type.model';
import { CreateTypeTaskDto } from './dto/create-type-task.dto';
import _ = require('lodash');
import { TYPE } from 'src/utils/constants';

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

  private types: Type[] = [
    TYPE.LOW,
    TYPE.MEDIUM,
    TYPE.HIGHT,
    // { name: 'bug', value: 4 },
    // { name: 'feature', value: 2 },
    // { name: 'fix', value: 3 },
    // { name: 'planning', value: 1 },
  ];

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
      throw new HttpException('not found type', HttpStatus.NOT_FOUND);
    }
    return type;
  }

  async getTypeByName(name) {
    const type = await this.taskTypeRepository.findOne({
      where: { name },
    });
    if (!type) {
      throw new HttpException('not found type', HttpStatus.NOT_FOUND);
    }
    return type;
  }

  async onModuleInit(): Promise<void> {
    await this.initTypes();
  }

  async initTypes(): Promise<void> {
    const existTypes = await this.findAll();
    // const types = await this.findAll();
    const notExistTypes = _.differenceBy(
      this.types,
      existTypes.map(({ value, name }) => ({ value, name })),
      'name',
    );
    if (!notExistTypes?.length) return;
    await Promise.all(notExistTypes.map((type: Type) => this.create(type)));
  }

  existType(id: number) {
    return Boolean(_.find(this.types, { value: id }).value);
  }

  getNotExistTypes(existTypes) {
    return this.types.filter(
      (type) => !existTypes.find(({ name }) => type === name),
    );
  }
}
