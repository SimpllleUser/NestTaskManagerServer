import { Injectable } from '@nestjs/common';
import { CreateStatusProjectDto } from '../project/project-status/dto/create-project-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.model';
import _ = require('lodash');
import { PropertyOption, STATUS } from 'src/utils/constants';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectModel(TaskStatus)
    private taskStatusRepository: typeof TaskStatus,
  ) {}

  private statuses = [
    STATUS.LOW,
    STATUS.NORMAL,
    STATUS.MEDIUM,
    STATUS.HIGHT,
    // {
    //   name: 'open',
    //   value: 1,
    // },
    // {
    //   name: 'in progress',
    //   value: 2,
    // },
    // {
    //   name: 'done',
    //   value: 3,
    // },
    // {
    //   name: 'todo',
    //   value: 4,
    // },
  ];

  async create(dto: CreateStatusProjectDto) {
    const statusProject = await this.taskStatusRepository.create(dto);
    return statusProject;
  }

  async findAll() {
    const statusesProject = await this.taskStatusRepository.findAll();
    return statusesProject;
  }

  async findOne(id: number) {
    const status = await this.taskStatusRepository.findByPk(id);
    return status;
  }

  async getStatusByName(name) {
    const status = await this.taskStatusRepository.findOne({
      where: { name },
    });
    return status;
  }

  async onModuleInit(): Promise<void> {
    await this.initStatuses();
  }
  async initStatuses(): Promise<void> {
    const existStatuses = await this.findAll();
    // const types = await this.findAll();
    const notExistTypes = _.differenceBy(
      this.statuses,
      existStatuses.map(({ value, name }) => ({ value, name })),
      'name',
    );
    if (!notExistTypes?.length) return;
    await Promise.all(notExistTypes.map((status) => this.create(status)));
  }

  existStatus(id: number): boolean {
    return Boolean(_.find(this.statuses, { value: id }).value);
  }

  getNotExistStatuses(existStatuses): PropertyOption[] {
    return this.statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
  }
}
