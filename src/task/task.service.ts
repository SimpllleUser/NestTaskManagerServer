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

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private taskTypeService: TaskTypeService,
    private taskPriorityService: TaskPriorityService,
    private taskStatusService: TaskStatusService,
  ) {}

  async create(dto: CreateTaskDto) {
    try {
      await this.taskTypeService.findOne(dto.typeId);
      await this.taskTypeService.findOne(dto.typeId);
      await this.taskPriorityService.findOne(dto.priorityId);
      await this.taskStatusService.findOne(dto.statusId);
      const task = await this.taskRepository.create(dto);
      const createdTask = await this.findOne(task.id);
      return createdTask;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
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
          model: User,
          as: 'executor',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    if (!task) {
      throw new HttpException('task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async findAllByAuthor(authorId: number) {
    const task = await this.taskRepository.findAll({
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
          model: User,
          as: 'executor',
          attributes: {
            exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    return task || {};
  }

  async findAllByProject(projectId: number) {
    const task = await this.taskRepository.findAll({
      where: { projectId },
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
      ],
    });
    return task;
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
}
