import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { User } from '../user/users.model';
import { Task } from '../task/task.model';
import { ProjectStatusService } from '../project-status/project-status.service';
import { UsersService } from '../user/users.service';
import { ProjectStatus } from 'src/project-status/project-status.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private projectStatusService: ProjectStatusService,
    private userService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    // const status = await this.projectStatusService.getStatusByName('todo');
    // project.statusId = status.id;
    const project = await this.projectRepository.create(createProjectDto);
    await project.$add('team', createProjectDto.authorId);
    await project.save();
    return project;
  }

  async findAllByAuthor(authorId: number) {
    const projects = await this.projectRepository.findAll({
      where: { authorId },
      include: [
        {
          model: ProjectStatus,
        },
        {
          model: User,
          as: 'author',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'author',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: ProjectStatus,
        },
        {
          model: Task,
          as: 'tasks',
        },
        {
          model: User,
          as: 'team',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
    await project.update(updateProjectDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.projectRepository.destroy({ where: { id } });
  }

  async addUsers(projectId, { userIds }: { userIds: number[] }) {
    const project = await this.findOne(projectId);
    const users = await this.userService.findByIds(userIds);
    await project.$add('team', users);
    await project.save();
    return project;
  }
  async deleteUsers(projectId, { userIds }: { userIds: number[] }) {
    const project = await this.findOne(projectId);
    const users = await this.userService.findByIds(userIds);
    await project.$remove('team', users);
    await project.save();
    return project;
  }
  async getAllStatuses() {
    const statuses = await this.projectStatusService.getAll();
    return statuses;
  }
}
