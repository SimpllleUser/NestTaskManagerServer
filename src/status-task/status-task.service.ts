import { Injectable } from '@nestjs/common';
import { CreateStatusProjectDto } from '../status-project/dto/create-status-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StatusTask } from './status-task.model';

@Injectable()
export class StatusTaskService {
  constructor(
    @InjectModel(StatusTask)
    private statusTaskRepository: typeof StatusTask,
  ) {}

  async create(dto: CreateStatusProjectDto) {
    const statusProject = await this.statusTaskRepository.create(dto);
    return statusProject;
  }

  async findAll() {
    const statusesProject = await this.statusTaskRepository.findAll();
    return statusesProject;
  }

  async getStatusByName(name) {
    const statusProject = await this.statusTaskRepository.findOne({
      where: { name },
    });
    return statusProject;
  }

  async onModuleInit(): Promise<void> {
    const statuses = await this.findAll();
    const notExistStatuses = this.getNotExistStatuses(statuses);
    if (!notExistStatuses?.length) return;
    await Promise.all(
      notExistStatuses.map((status: string) => this.create({ name: status })),
    );
  }

  getNotExistStatuses(existStatuses) {
    const statuses = ['OPEN', 'IN_PROGRESS', 'CLOSE', 'PLANNED'];
    const notExistsStatus = statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
  }
}
