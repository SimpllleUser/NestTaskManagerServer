import { User } from '../../user/users.model';
import { Model } from 'sequelize-typescript';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { Task } from '../task.model';
export declare class TaskComment extends Model<TaskComment, CreateTaskCommentDto> {
    id: number;
    body: string;
    authorId: number;
    author: User;
    taskId: number;
    task: Task;
}
