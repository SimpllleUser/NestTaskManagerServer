import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/users.model';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './task-comment.model';

@Injectable()
export class TaskCommentService {
  constructor(
    @InjectModel(TaskComment)
    private taskCommentRepository: typeof TaskComment,
  ) {}

  async getOneById(id: number) {
    const comment = await this.taskCommentRepository.findOne({
      where: { id },
      include: [{ model: User }],
    });
    return comment;
  }

  async create(dto: CreateTaskCommentDto) {
    const createdComment = await this.taskCommentRepository.create(dto);
    const comment = await this.getOneById(createdComment.id);
    return comment;
  }

  async findAllByTaskId(taskId: number) {
    const comments = await this.taskCommentRepository.findAll({
      where: { taskId },
      include: [{ model: User }],
    });
    return comments;
  }

  async onModuleInit(): Promise<void> {}
}
