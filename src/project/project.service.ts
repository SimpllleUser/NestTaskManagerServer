import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { User } from '../user/users.model';
import { Task } from '../task/task.model';
import { StatusProjectService } from '../project-status/project-status.service';
import { UsersService } from '../user/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private statusProjectService: StatusProjectService,
    private userService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const status = await this.statusProjectService.getStatusByName('TODO');
    const project = await this.projectRepository.create(createProjectDto);
    await project.$add('team', createProjectDto.authorId);
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
    const updatedProject = await project.update(updateProjectDto);
    return updatedProject;
  }

  async remove(id: number) {
    return await this.projectRepository.destroy({ where: { id } });
  }

  async addUser(projectId, userId: number) {
    const project = await this.findOne(projectId);
    const user = await this.userService.findOne(userId);
    await project.$add('team', userId);
    await project.save();
    return user;
  }
  async deleteUser(projectId, userId: number) {
    const project = await this.findOne(projectId);
    await project.$remove('team', userId);
    await project.save();
    return { status: true };
  }
}
//
