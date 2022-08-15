import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { TaskComment } from './task-comment.model';
export declare class TaskCommentService {
    private taskCommentRepository;
    constructor(taskCommentRepository: typeof TaskComment);
    getOneById(id: number): Promise<TaskComment>;
    create(dto: CreateTaskCommentDto): Promise<TaskComment>;
    findAllByTaskId(taskId: number): Promise<TaskComment[]>;
    onModuleInit(): Promise<void>;
}
