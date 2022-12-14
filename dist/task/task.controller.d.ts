import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TaskStatusService } from 'src/task-status/task-status.service';
import { TaskComment } from './task-comment/task-comment.model';
import { CreateTaskCommentDto } from './task-comment/dto/create-task-comment.dto';
export declare class TasksController {
    private taskService;
    private taskStatusService;
    constructor(taskService: TasksService, taskStatusService: TaskStatusService);
    createTask(dto: CreateTaskDto): Promise<Task>;
    getTask(id: number): Promise<Task>;
    getAllByAuthor(userId: number): Promise<{}>;
    getAllByExecutor(userId: number): Promise<{}>;
    getAllByProject(projectId: number): Promise<Task[]>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<{
        result: boolean;
    }>;
    getStatuses(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    getPiorities(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    getAllTypes(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    addComment(comment: CreateTaskCommentDto): Promise<TaskComment>;
    getComments(id: number): Promise<TaskComment[]>;
}
