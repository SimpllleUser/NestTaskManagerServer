import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusService } from '../task-status/task-status.service';
import { TaskTypeService } from '../task-type/task-type.service';
import { TaskPriorityService } from '../task-priority/task-priority.service';
import { CreateTaskCommentDto } from './task-comment/dto/create-task-comment.dto';
import { TaskCommentService } from './task-comment/task-comment.service';
import { TaskComment } from './task-comment/task-comment.model';
export declare class TasksService {
    private taskRepository;
    private taskTypeService;
    private taskPriorityService;
    private taskStatusService;
    private taskCommentService;
    constructor(taskRepository: typeof Task, taskTypeService: TaskTypeService, taskPriorityService: TaskPriorityService, taskStatusService: TaskStatusService, taskCommentService: TaskCommentService);
    create(dto: CreateTaskDto): Promise<Task>;
    findOne(id: number): Promise<Task>;
    findAllByAuthor(authorId: number): Promise<{}>;
    findAllByProject(projectId: number): Promise<Task[]>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<{
        result: boolean;
    }>;
    getAllStatuses(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    getAllPriorities(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    getAllTypes(): Promise<import("../general-option/option-general.model").OptionModel[]>;
    addComment(comment: CreateTaskCommentDto): Promise<TaskComment>;
    getComments(taskId: number): Promise<TaskComment[]>;
}
