import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StatusProject } from './status-project.model';
import { CreateStatusProjectDto } from './dto/create-status-project.dto';

@Injectable()
export class StatusProjectService implements OnModuleInit {
  constructor(
    @InjectModel(StatusProject)
    private statusProjectRepository: typeof StatusProject,
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
    if (!notExistStatuses?.length) return;
    await Promise.all(
      notExistStatuses.map((status: string) => this.create({ name: status })),
    );
  }

  getNotExistStatuses(existStatuses) {
    const statuses = ['OPEN', 'IN_PROGRESS', 'DONE', 'TODO'];
    const notExistsStatus = statuses.filter(
      (status) => !existStatuses.find(({ name }) => status === name),
    );
    return notExistsStatus;
  }
}
