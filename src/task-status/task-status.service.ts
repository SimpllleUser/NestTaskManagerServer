import { Injectable } from '@nestjs/common';
import { CreateStatusProjectDto } from '../project-status/dto/create-project-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.model';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectModel(TaskStatus)
    private taskStatusRepository: typeof TaskStatus,
  ) {}

  async create(dto: CreateStatusProjectDto) {
    const statusProject = await this.taskStatusRepository.create(dto);
    return statusProject;
  }

  async findAll() {
    const statusesProject = await this.taskStatusRepository.findAll();
    return statusesProject;
  }

  async getStatusByName(name) {
    const statusProject = await this.taskStatusRepository.findOne({
      where: { name },
    });
    return statusProject;
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

  getNotExistStatuses(existStatuses) {
    const statuses = [
      {
        name: 'OPEN',
        value: 1,
      },
      {
        name: 'IN_PROGRESS',
        value: 2,
      },
      {
        name: 'DONE',
        value: 3,
      },
      {
        name: 'TODO',
        value: 4,
      },
    ];
    const notExistsStatus = statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
    //
  }
}
