import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { CreateStatusProjectDto } from './dto/create-project-status.dto';
import { PropertyOption, STATUS } from 'src/utils/constants';
import _ = require('lodash');

@Injectable()
export class ProjectStatusService implements OnModuleInit {
  constructor(
    @InjectModel(ProjectStatus)
    private projectStatusRepository: typeof ProjectStatus,
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
    const statusProject = await this.projectStatusRepository.create(dto);
    return statusProject;
  }

  async findAll(): Promise<ProjectStatus[]> {
    const statusesProject = await this.projectStatusRepository.findAll();
    return statusesProject;
  }

  async findOne(id: number) {
    const status = await this.projectStatusRepository.findByPk(id);
    return status;
  }

  async getStatusByName(name) {
    const status = await this.projectStatusRepository.findOne({
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
    return Boolean(_.find(this.statuses, { value: id })?.value);
  }

  getNotExistStatuses(existStatuses): PropertyOption[] {
    const notExistsStatus = this.statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
  }
}
