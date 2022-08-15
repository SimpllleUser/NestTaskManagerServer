import { ProjectComment } from './../project/project-comment/project-comment.model';
import { Model } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { Task } from '../task/task.model';
import { Project } from '../project/project.model';
interface UserCreationAttrs {
    login: string;
    name: string;
    password: string;
    isActive: boolean;
    hashCode: string;
}
export interface UserModel {
    id: number;
    login: string;
    name: string;
    password: string;
    hashCode: string;
    isActive: boolean;
    roles: Role[];
    tasks: Task[];
    projects: Project[];
}
export interface UserAuth {
    id: number;
    login: string;
    name: string;
    token: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    login: string;
    name: string;
    password: string;
    hashCode: string;
    isActive: boolean;
    roles: Role[];
    tasks: Task[];
    comments: ProjectComment[];
    projects: Project[];
}
export {};
