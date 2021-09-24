import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { User } from '../users/users.model';
import { Task } from '../tasks/task.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    return project;
  }

  async findAllByAuthor(userId: number) {
    const projects = await this.projectRepository.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: Task,
          as: 'tasks',
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
          model: Task,
          as: 'tasks',
        },
      ],
    });
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
    const updatedProject = await project.update(updateProjectDto);
    return updatedProject;
  }

  async remove(id: number) {
    return await this.projectRepository.destroy({ where: { id } });
  }
}
