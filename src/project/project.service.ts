import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { User } from '../users/users.model';
import { Task } from '../tasks/task.model';
import { StatusProjectService } from '../status-project/status-project.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private statusProject: StatusProjectService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const status = await this.statusProject.getStatusByName('TODO');
    const project = await this.projectRepository.create(createProjectDto);
    project.statusId = status.id;
    await project.save();
    return project;
  }

  async findAllByAuthor(authorId: number) {
    const projects = await this.projectRepository.findAll({
      where: { authorId },
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
//
