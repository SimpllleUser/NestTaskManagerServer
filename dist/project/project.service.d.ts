import { ProjectComment } from './project-comment/project-comment.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.model';
import { User } from '../user/users.model';
import { ProjectStatusService } from './project-status/project-status.service';
import { UsersService } from '../user/users.service';
import { ProjectStatus } from 'src/project/project-status/project-status.model';
import { CreateProjectCommentDto } from './project-comment/dto/create-project-comment.dto';
import { ProjectCommentService } from './project-comment/project-comment.service';
export declare class ProjectService {
    private projectRepository;
    private projectStatusService;
    private userService;
    private projectCommentService;
    constructor(projectRepository: typeof Project, projectStatusService: ProjectStatusService, userService: UsersService, projectCommentService: ProjectCommentService);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAllByAuthor(authorId: number): Promise<Project[]>;
    findAllAvailableForUser(userId: number): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<number>;
    addUsers(projectId: any, { userIds }: {
        userIds: number[];
    }): Promise<User[]>;
    deleteUsers(projectId: any, { userIds }: {
        userIds: number[];
    }): Promise<User[]>;
    addUser(projectId: any, userId: number): Promise<User>;
    deleteUser(projectId: any, userId: number): Promise<User>;
    getAllStatuses(): Promise<ProjectStatus[]>;
    getUsersByProject(projectId: any): Promise<Project[]>;
    addComment(comment: CreateProjectCommentDto): Promise<ProjectComment>;
    getComments(id: number): Promise<ProjectComment[]>;
    existUserInTeam(project: Project, userIds: number[]): boolean;
    userExistOnProject({ projectId, userId }: {
        projectId: any;
        userId: any;
    }): Promise<Project[]>;
}
