import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { ProjectComment } from './project-comment.model';

@Injectable()
export class ProjectCommentService {
  constructor(
    @InjectModel(ProjectComment)
    private projectCommentRepository: typeof ProjectComment,
  ) {}

  async create(dto: CreateProjectCommentDto) {
    const comment = await this.projectCommentRepository.create(dto);
    return comment;
  }

  async findAllByProjectId(projectId: number) {
    const comments = await this.projectCommentRepository.findAll({ where:{ projectId } });
    return comments;
  }

//   async getStatusByName(name) {
//     const statusProject = await this.projectCommentRepository.findOne({
//       where: { name },
//     });
//     return statusProject;
//   }

  async onModuleInit(): Promise<void> {

  }

}
