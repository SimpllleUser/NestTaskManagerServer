import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusProjectDto } from '../project/project-status/dto/create-project-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.model';
import _ = require('lodash');

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectModel(TaskStatus)
    private taskStatusRepository: typeof TaskStatus,
  ) {}

  private statuses = [
    {
      name: 'open',
      value: 1,
    },
    {
      name: 'in progress',
      value: 2,
    },
    {
      name: 'done',
      value: 3,
    },
    {
      name: 'todo',
      value: 4,
    },
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
    if (!status) {
      throw new HttpException('not found status', HttpStatus.NOT_FOUND)
    }
    return status;
  }

  async getStatusByName(name) {
    const status = await this.taskStatusRepository.findOne({
      where: { name },
    });
    if (!status) {
      throw new HttpException('not found status', HttpStatus.NOT_FOUND)
    }
    return status;
  }

  async onModuleInit(): Promise<void> {
    const statuses = await this.findAll();
    const notExistStatuses = this.getNotExistStatuses(statuses);
    if (statuses?.length) return;
    await Promise.all(
      notExistStatuses.map((status: CreateStatusProjectDto) =>
        this.create(status),
      ),
    );
  }

  existStatus(id: number) {
    const exist = _.find(this.statuses, { value: id });
    if (!exist) throw new HttpException('not found status', HttpStatus.NOT_FOUND);
    return exist;
  }

  getNotExistStatuses(existStatuses) {
    const notExistsStatus = this.statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
    //
  }
}
