import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/users.model';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { ProjectComment } from './project-comment.model';

@Injectable()
export class ProjectCommentService {
  constructor(
    @InjectModel(ProjectComment)
    private projectCommentRepository: typeof ProjectComment,
  ) {}

  async getOneById(id: number) {
    const comment = await this.projectCommentRepository.findOne({
      where: { id },
      include: [{ model: User }],
    });
    return comment;
  }

  async create(dto: CreateProjectCommentDto) {
    const createdComment = await this.projectCommentRepository.create(dto);
    const comment = await this.getOneById(createdComment.id);
    return comment;
  }

  async findAllByProjectId(projectId: number) {
    const comments = await this.projectCommentRepository.findAll({
      where: { projectId },
      include: [{ model: User }],
    });
    return comments;
  }

  //   async getStatusByName(name) {
  //     const statusProject = await this.projectCommentRepository.findOne({
  //       where: { name },
  //     });
  //     return statusProject;
  //   }

  async onModuleInit(): Promise<void> {}
}
