import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from '../users/users.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return task || {};
  }

  async findAllByAuthor(userId: number) {
    const task = await this.taskRepository.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'author',
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
}
