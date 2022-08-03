import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectStatus } from './project-status.model';
import { CreateStatusProjectDto } from './dto/create-project-status.dto';

@Injectable()
export class ProjectStatusService implements OnModuleInit {
  constructor(
    @InjectModel(ProjectStatus)
    private projectStatusRepository: typeof ProjectStatus,
  ) {}

  async create(dto: CreateStatusProjectDto) {
    const statusProject = await this.projectStatusRepository.create(dto);
    return statusProject;
  }

  async getAll(): Promise<ProjectStatus[]> {
    const statusesProject = await this.projectStatusRepository.findAll();
    return statusesProject;
  }

  async findOne(id: number) {
    const status = await this.projectStatusRepository.findByPk(id);
    if (!status) {
      throw new HttpException('not found status', HttpStatus.NOT_FOUND)
    }
    return status;
  }

  async getStatusByName(name) {
    const status = await this.projectStatusRepository.findOne({
      where: { name },
    });
    if (!status) {
      throw new HttpException('not found status', HttpStatus.NOT_FOUND)
    }
    return status;
  }

  async onModuleInit(): Promise<void> {
    const statuses = await this.getAll();
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
