import { User } from './../../user/users.model';
import { Model } from 'sequelize-typescript';
import { Project } from '../project.model';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
export declare class ProjectComment extends Model<ProjectComment, CreateProjectCommentDto> {
    id: number;
    body: string;
    authorId: number;
    author: User;
    projectId: number;
    project: Project;
}
