"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const project_comment_model_1 = require("./project-comment/project-comment.model");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const project_model_1 = require("./project.model");
const users_model_1 = require("../user/users.model");
const task_model_1 = require("../task/task.model");
const project_status_service_1 = require("./project-status/project-status.service");
const users_service_1 = require("../user/users.service");
const project_status_model_1 = require("./project-status/project-status.model");
const project_comment_service_1 = require("./project-comment/project-comment.service");
const _ = require("lodash");
let ProjectService = class ProjectService {
    constructor(projectRepository, projectStatusService, userService, projectCommentService) {
        this.projectRepository = projectRepository;
        this.projectStatusService = projectStatusService;
        this.userService = userService;
        this.projectCommentService = projectCommentService;
    }
    async create(createProjectDto) {
        await this.projectStatusService.findOne(createProjectDto.statusId);
        const project = await this.projectRepository.create(createProjectDto);
        await this.userService.findOne(createProjectDto.authorId);
        await project.$add('team', createProjectDto.authorId);
        await project.save();
        return project;
    }
    async findAllByAuthor(authorId) {
        const projects = await this.projectRepository.findAll({
            where: { authorId },
            include: [
                {
                    model: project_status_model_1.ProjectStatus,
                },
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        return projects;
    }
    async findAllAvailableForUser(userId) {
        const projects = await this.projectRepository.findAll({
            include: [
                {
                    model: project_status_model_1.ProjectStatus,
                },
                {
                    model: users_model_1.User,
                    as: 'team',
                    where: {
                        id: userId,
                    },
                },
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        return projects;
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            include: [
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: project_status_model_1.ProjectStatus,
                },
                {
                    model: project_comment_model_1.ProjectComment,
                },
                {
                    model: task_model_1.Task,
                    as: 'tasks',
                },
                {
                    model: users_model_1.User,
                    as: 'team',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        if (!project) {
            throw new common_1.HttpException('Not found project', common_1.HttpStatus.NOT_FOUND);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.findOne(id);
        await project.update(updateProjectDto);
        return await this.findOne(id);
    }
    async remove(id) {
        return await this.projectRepository.destroy({ where: { id } });
    }
    async addUsers(projectId, { userIds }) {
        const project = await this.findOne(projectId);
        if (this.existUserInTeam(project, userIds)) {
            throw new common_1.HttpException('One or more user exist in team ', common_1.HttpStatus.CONFLICT);
        }
        const users = await this.userService.findByIds(userIds);
        await project.$add('team', users);
        await project.save();
        return users;
    }
    async deleteUsers(projectId, { userIds }) {
        const project = await this.findOne(projectId);
        const users = await this.userService.findByIds(userIds);
        await project.$remove('team', users);
        await project.save();
        return users;
    }
    async addUser(projectId, userId) {
        const project = await this.findOne(projectId);
        if (this.existUserInTeam(project, [userId])) {
            throw new common_1.HttpException('One or more user exist in team ', common_1.HttpStatus.CONFLICT);
        }
        const user = await this.userService.findOne(userId);
        await project.$add('team', userId);
        await project.save();
        return user;
    }
    async deleteUser(projectId, userId) {
        const project = await this.findOne(projectId);
        if (this.existUserInTeam(project, [userId])) {
            throw new common_1.HttpException('One or more user not exist in team ', common_1.HttpStatus.CONFLICT);
        }
        const user = await this.userService.findOne(userId);
        await project.$remove('team', userId);
        await project.save();
        return user;
    }
    async getAllStatuses() {
        const statuses = await this.projectStatusService.getAll();
        return statuses;
    }
    async getUsersByProject(projectId) {
        const statuses = await this.projectRepository.findAll({
            where: { id: projectId },
            include: [
                {
                    model: users_model_1.User,
                    as: 'team',
                },
            ],
        });
        return statuses;
    }
    async addComment(comment) {
        const project = await this.findOne(comment.projectId);
        const createdComment = await this.projectCommentService.create(comment);
        await project.$add('comments', createdComment);
        return createdComment;
    }
    async getComments(id) {
        const comments = this.projectCommentService.findAllByProjectId(id);
        return comments;
    }
    existUserInTeam(project, userIds) {
        return Boolean(_.chain(userIds).intersection(_.map(project.team, 'id')).value().length);
    }
    async userExistOnProject({ projectId, userId }) {
        const projects = await this.projectRepository.findAll({
            where: { id: projectId },
            include: [
                {
                    model: project_status_model_1.ProjectStatus,
                },
                {
                    model: users_model_1.User,
                    as: 'team',
                    where: {
                        id: userId,
                    },
                },
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        return projects;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(project_model_1.Project)),
    __metadata("design:paramtypes", [Object, project_status_service_1.ProjectStatusService,
        users_service_1.UsersService,
        project_comment_service_1.ProjectCommentService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map