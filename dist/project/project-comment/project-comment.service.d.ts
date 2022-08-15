import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { ProjectComment } from './project-comment.model';
export declare class ProjectCommentService {
    private projectCommentRepository;
    constructor(projectCommentRepository: typeof ProjectComment);
    getOneById(id: number): Promise<ProjectComment>;
    create(dto: CreateProjectCommentDto): Promise<ProjectComment>;
    findAllByProjectId(projectId: number): Promise<ProjectComment[]>;
    onModuleInit(): Promise<void>;
}
