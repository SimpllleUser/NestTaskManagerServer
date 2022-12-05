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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const task_model_1 = require("./task.model");
const users_model_1 = require("../user/users.model");
const task_status_model_1 = require("../task-status/task-status.model");
const task_status_service_1 = require("../task-status/task-status.service");
const task_type_service_1 = require("../task-type/task-type.service");
const task_type_model_1 = require("../task-type/task-type.model");
const task_priority_service_1 = require("../task-priority/task-priority.service");
const task_priority_model_1 = require("../task-priority/task-priority.model");
const task_comment_service_1 = require("./task-comment/task-comment.service");
const task_comment_model_1 = require("./task-comment/task-comment.model");
let TasksService = class TasksService {
    constructor(taskRepository, taskTypeService, taskPriorityService, taskStatusService, taskCommentService) {
        this.taskRepository = taskRepository;
        this.taskTypeService = taskTypeService;
        this.taskPriorityService = taskPriorityService;
        this.taskStatusService = taskStatusService;
        this.taskCommentService = taskCommentService;
    }
    async create(dto) {
        await this.taskTypeService.existType(dto.typeId);
        await this.taskPriorityService.existPriority(dto.priorityId);
        await this.taskStatusService.existStatus(dto.statusId);
        const task = await this.taskRepository.create(dto);
        const createdTask = await this.findOne(task.id);
        return createdTask;
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
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
                    model: task_status_model_1.TaskStatus,
                },
                {
                    model: task_type_model_1.TaskType,
                },
                {
                    model: task_priority_model_1.TaskPriority,
                },
                {
                    model: task_priority_model_1.TaskPriority,
                },
                {
                    model: task_comment_model_1.TaskComment,
                },
                {
                    model: users_model_1.User,
                    as: 'executor',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        if (!task) {
            throw new common_1.HttpException('task not found', common_1.HttpStatus.NOT_FOUND);
        }
        return task;
    }
    async findAllByAuthor(authorId) {
        const task = await this.taskRepository.findAll({
            where: { authorId },
            include: [
                {
                    model: users_model_1.User,
                    as: 'author',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: task_status_model_1.TaskStatus,
                },
                {
                    model: task_type_model_1.TaskType,
                },
                {
                    model: task_priority_model_1.TaskPriority,
                },
                {
                    model: task_priority_model_1.TaskPriority,
                },
                {
                    model: users_model_1.User,
                    as: 'executor',
                    attributes: {
                        exclude: ['password', 'hashCode', 'createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        return task || {};
    }
    async findAllByProject(projectId) {
        const tasks = await this.taskRepository.findAll({
            where: { projectId },
            include: [
                {
                    model: task_status_model_1.TaskStatus,
                },
                {
                    model: task_type_model_1.TaskType,
                },
                {
                    model: task_priority_model_1.TaskPriority,
                },
            ],
        });
        return tasks;
    }
    async update(id, updateTaskDto) {
        try {
            const task = await this.findOne(id);
            await task.update(updateTaskDto);
            const updatedTask = await this.findOne(id);
            return updatedTask;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        await this.taskRepository.destroy({ where: { id } });
        return { result: true };
    }
    async getAllStatuses() {
        const statuses = await this.taskStatusService.findAll();
        return statuses;
    }
    async getAllPriorities() {
        const priorities = await this.taskPriorityService.findAll();
        return priorities;
    }
    async getAllTypes() {
        const types = await this.taskTypeService.findAll();
        return types;
    }
    async addComment(comment) {
        const task = await this.findOne(comment.taskId);
        const createdComment = await this.taskCommentService.create(comment);
        await task.$add('comments', createdComment);
        return createdComment;
    }
    async getComments(taskId) {
        const comments = this.taskCommentService.findAllByTaskId(taskId);
        return comments;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_model_1.Task)),
    __metadata("design:paramtypes", [Object, task_type_service_1.TaskTypeService,
        task_priority_service_1.TaskPriorityService,
        task_status_service_1.TaskStatusService,
        task_comment_service_1.TaskCommentService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=task.service.js.map