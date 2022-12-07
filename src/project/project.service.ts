import { ProjectComment } from './project-comment/project-comment.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { User } from '../user/users.model';
import { Task } from '../task/task.model';
import { ProjectStatusService } from './project-status/project-status.service';
import { UsersService } from '../user/users.service';
import { ProjectStatus } from 'src/project/project-status/project-status.model';
import { CreateProjectCommentDto } from './project-comment/dto/create-project-comment.dto';
import { ProjectCommentService } from './project-comment/project-comment.service';
import _ = require('lodash');

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private projectStatusService: ProjectStatusService,
    private userService: UsersService,
    private projectCommentService: ProjectCommentService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.projectStatusService.findOne(createProjectDto.statusId);
    const project = await this.projectRepository.create(createProjectDto);
    await this.userService.findOne(createProjectDto.authorId);
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
  async findAllAvailableForUser(userId: number) {
    const projects = await this.projectRepository.findAll({
      include: [
        {
          model: ProjectStatus,
        },
        {
          model: User,
          as: 'team',
          where: {
            id: userId,
          },
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
          model: ProjectComment,
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
    if (!project) {
      throw new HttpException('Not found project', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    await project.update(updateProjectDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.projectRepository.destroy({ where: { id } });
  }
  async addUsers(projectId, { userIds }: { userIds: number[] }) {
    const project = await this.findOne(projectId);
    if (this.existUserInTeam(project, userIds)) {
      throw new HttpException(
        'One or more user exist in team ',
        HttpStatus.CONFLICT,
      );
    }
    const users = await this.userService.findByIds(userIds);
    await project.$add('team', users);
    await project.save();
    return users;
  }
  async deleteUsers(projectId, { userIds }: { userIds: number[] }) {
    const project = await this.findOne(projectId);
    // if (!this.existUserInTeam(project, userIds)) {
    //   throw new HttpException(
    //     'One or more user not exist in team ',
    //     HttpStatus.CONFLICT,
    //   );
    // }
    const users = await this.userService.findByIds(userIds);
    await project.$remove('team', users);
    await project.save();
    return users;
  }
  async addUser(projectId, userId: number) {
    const project = await this.findOne(projectId);
    if (this.existUserInTeam(project, [userId])) {
      throw new HttpException(
        'One or more user exist in team ',
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.userService.findOne(userId);
    await project.$add('team', userId);
    await project.save();
    return user;
  }
  async deleteUser(projectId, userId: number) {
    const project = await this.findOne(projectId);
    if (this.existUserInTeam(project, [userId])) {
      throw new HttpException(
        'One or more user not exist in team ',
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.userService.findOne(userId);
    await project.$remove('team', userId);
    await project.save();
    return user;
  }
  async getAllStatuses() {
    const statuses = await this.projectStatusService.findAll();
    return statuses;
  }
  async getUsersByProject(projectId) {
    const statuses = await this.projectRepository.findAll({
      where: { id: projectId },
      include: [
        {
          model: User,
          as: 'team',
        },
      ],
    });
    return statuses;
  }
  async addComment(comment: CreateProjectCommentDto) {
    const project = await this.findOne(comment.projectId);
    const createdComment = await this.projectCommentService.create(comment);
    await project.$add('comments', createdComment);
    return createdComment;
  }
  async getComments(id: number) {
    const comments = this.projectCommentService.findAllByProjectId(id);
    return comments;
  }
  existUserInTeam(project: Project, userIds: number[]) {
    return Boolean(
      _.chain(userIds).intersection(_.map(project.team, 'id')).value().length,
    );
  }
  async userExistOnProject({ projectId, userId }) {
    const projects = await this.projectRepository.findAll({
      where: { id: projectId },
      include: [
        {
          model: ProjectStatus,
        },
        {
          model: User,
          as: 'team',
          where: {
            id: userId,
          },
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
}
