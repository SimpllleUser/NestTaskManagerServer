import { Model } from 'sequelize-typescript';
import { User } from '../user/users.model';
import { TaskStatus } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { TaskType } from '../task-type/task-type.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskComment } from './task-comment/task-comment.model';
export interface TaskCreationAttrs {
    title: string;
    description: string;
    authorId: number;
    typeId: number;
    priorityId: number;
    statusId: number;
    executorId: number;
}
export declare class CreateTaskBody {
    task: CreateTaskDto;
}
export declare class Task extends Model<Task, TaskCreationAttrs> {
    id: number;
    title: string;
    description: string;
    authorId: number;
    author: User;
    projectId: number;
    project: Project;
    comments: TaskComment[];
    statusId: number;
    status: TaskStatus;
    typeId: number;
    type: TaskType;
    priorityId: number;
    priority: TaskType;
    executorId: number;
    executor: User;
}
