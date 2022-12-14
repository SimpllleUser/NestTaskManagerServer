import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from '../user/users.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '../task-status/task-status.model';
import { TaskStatusService } from '../task-status/task-status.service';
import { TaskTypeService } from '../task-type/task-type.service';
import { TaskType } from '../task-type/task-type.model';
import { TaskPriorityService } from '../task-priority/task-priority.service';
import { TaskPriority } from '../task-priority/task-priority.model';
import { CreateTaskCommentDto } from './task-comment/dto/create-task-comment.dto';
import { TaskCommentService } from './task-comment/task-comment.service';
import { TaskComment } from './task-comment/task-comment.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private taskTypeService: TaskTypeService,
    private taskPriorityService: TaskPriorityService,
    private taskStatusService: TaskStatusService,
    private taskCommentService: TaskCommentService,
  ) {}
  private getUserParamsAs(enity: string) {
    return {
      model: User,
      as: enity,
      attributes: {
        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
      },
    };
  }
  private projectDetailparamsModel = {
    include: [
      {
        model: TaskStatus,
      },
      {
        model: TaskType,
      },
      {
        model: TaskPriority,
      },
      {
        model: TaskPriority,
      },
      {
        model: TaskComment,
      },
      this.getUserParamsAs('executor'),
      this.getUserParamsAs('author'),
    ],
  };

  async create(dto: CreateTaskDto) {
    await this.taskTypeService.existEnity(dto.typeId);
    // await this.taskPriorityService.existEnity(dto.priorityId);
    // await this.taskStatusService.existEnity(dto.statusId);
    const task = await this.taskRepository.create(dto);
    const createdTask = await this.findOne(task.id);
    return createdTask;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      ...this.projectDetailparamsModel,
    });
    if (!task) {
      throw new HttpException('task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async findAllByAuthor(authorId: number) {
    const task = await this.taskRepository.findAll({
      where: { authorId },
      ...this.projectDetailparamsModel,
    });
    return task || {};
  }
  async findAllByExecutor(executorId: number) {
    const task = await this.taskRepository.findAll({
      where: { executorId },
      ...this.projectDetailparamsModel,
    });
    return task || {};
  }

  async findAllByProject(projectId: number) {
    const tasks = await this.taskRepository.findAll({
      where: { projectId },
      ...this.projectDetailparamsModel,
    });
    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.findOne(id);
      await task.update(updateTaskDto);
      const updatedTask = await this.findOne(id);
      return updatedTask;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    await this.taskRepository.destroy({ where: { id } });
    return { result: true };
  }

  async getAllStatuses() {
    const statuses = await this.taskStatusService.findAll();
    return statuses;
  }
  async getAllPriorities() {
    const priorities = await this.taskPriorityService.findAll();
    return priorities;
  }
  async getAllTypes() {
    const types = await this.taskTypeService.findAll();
    return types;
  }
  async addComment(comment: CreateTaskCommentDto) {
    const task = await this.findOne(comment.taskId);
    const createdComment = await this.taskCommentService.create(comment);
    await task.$add('comments', createdComment);
    return createdComment;
  }
  async getComments(taskId: number) {
    const comments = this.taskCommentService.findAllByTaskId(taskId);
    return comments;
  }
}
