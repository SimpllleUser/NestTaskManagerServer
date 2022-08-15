import { CreateProjectCommentDto } from './project-comment/dto/create-project-comment.dto';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.model';
import { User } from 'src/user/users.model';
import { ProjectComment } from './project-comment/project-comment.model';
import { ProjectStatus } from './project-status/project-status.model';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAllByAuthor(id: number): Promise<Project[]>;
    findAllByAvailable(id: number): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: string): Promise<number>;
    addUsers(id: number, body: {
        userIds: number[];
    }): Promise<User[]>;
    deleteUsers(id: number, body: {
        userIds: number[];
    }): Promise<User[]>;
    addUser(id: number, userId: number): Promise<User>;
    deleteUser(id: number, userId: number): Promise<User>;
    addComment(comment: CreateProjectCommentDto): Promise<ProjectComment>;
    getComments(id: number): Promise<ProjectComment[]>;
    getProjectStatuses(): Promise<ProjectStatus[]>;
    getUsersByProject(id: number): Promise<Project[]>;
}
