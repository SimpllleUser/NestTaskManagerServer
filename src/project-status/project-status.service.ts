import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { CreateStatusProjectDto } from './dto/create-project-status.dto';

@Injectable()
export class StatusProjectService implements OnModuleInit {
  constructor(
    @InjectModel(ProjectStatus)
    private statusProjectRepository: typeof ProjectStatus,
  ) {}

  async create(dto: CreateStatusProjectDto) {
    const statusProject = await this.statusProjectRepository.create(dto);
    return statusProject;
  }

  async findAll() {
    const statusesProject = await this.statusProjectRepository.findAll();
    return statusesProject;
  }

  async getStatusByName(name) {
    const statusProject = await this.statusProjectRepository.findOne({
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
    const notExistsStatus = statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
  }
}
