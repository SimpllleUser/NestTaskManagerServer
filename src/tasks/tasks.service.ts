import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from '../users/users.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusProjectService } from '../status-project/status-project.service';
import { StatusTask } from '../status-task/status-task.model';
import { StatusTaskService } from '../status-task/status-task.service';
import { TypeTaskService } from '../type-task/type-task.service';
import { TypeTask } from '../type-task/type-task.model';
import { PriorityTaskService } from '../priority-task/priority-task.service';
import { PriorityTask } from '../priority-task/priority-task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private statusTask: StatusTaskService,
    private typeTask: TypeTaskService,
    private priorityTask: PriorityTaskService,
  ) {}

  async create(dto: CreateTaskDto) {
    const status = await this.statusTask.getStatusByName('OPEN');
    const task = await this.taskRepository.create(dto);
    task.statusId = status.id;
    await task.save();
    return task;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return task || {};
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
          model: StatusTask,
        },
        {
          model: TypeTask,
        },
        {
          model: PriorityTask,
        },
        {
          model: PriorityTask,
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
    });
    return task || {};
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    const updatedTask = await task.update(updateTaskDto);
    return updatedTask;
  }

  async remove(id: number) {
    await this.taskRepository.destroy({ where: { id } });
    return { result: true };
  }

  async onModuleInit(): Promise<void> {
    // await this.priorityTask.initPriorities();//
  }
}
