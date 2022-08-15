import { Model } from 'sequelize-typescript';
import { User } from '../user/users.model';
import { Task } from '../task/task.model';
import { ProjectStatus } from './project-status/project-status.model';
import { ProjectComment } from './project-comment/project-comment.model';
interface ProjectCreationAttrs {
    title: string;
    description: string;
    authorId: number;
}
export declare class Project extends Model<Project, ProjectCreationAttrs> {
    id: number;
    title: string;
    description: string;
    tasks: Task[];
    comments: ProjectComment[];
    team: User[];
    authorId: number;
    author: User;
    statusId: number;
    status: ProjectStatus;
}
export {};
