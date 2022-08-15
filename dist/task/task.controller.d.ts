import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TaskStatus } from 'src/task-status/task-status.model';
import { TaskStatusService } from 'src/task-status/task-status.service';
import { TaskPriority } from 'src/task-priority/task-priority.model';
import { TaskType } from 'src/task-type/task-type.model';
import { TaskComment } from './task-comment/task-comment.model';
import { CreateTaskCommentDto } from './task-comment/dto/create-task-comment.dto';
export declare class TasksController {
    private taskService;
    private taskStatusService;
    constructor(taskService: TasksService, taskStatusService: TaskStatusService);
    createTask(dto: CreateTaskDto): Promise<Task>;
    getTask(id: number): Promise<Task>;
    getAllByAuthor(userId: number): Promise<{}>;
    getAllByProject(projectId: number): Promise<Task[]>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<{
        result: boolean;
    }>;
    getStatuses(): Promise<TaskStatus[]>;
    getPiorities(): Promise<TaskPriority[]>;
    getAllTypes(): Promise<TaskType[]>;
    addComment(comment: CreateTaskCommentDto): Promise<TaskComment>;
    getComments(id: number): Promise<TaskComment[]>;
}
