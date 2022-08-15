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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const task_guard_1 = require("./task.guard");
const validation_pipe_1 = require("../pipes/validation.pipe");
const jwt_auth_guards_1 = require("../auth/jwt-auth-guards");
const swagger_1 = require("@nestjs/swagger");
const task_model_1 = require("./task.model");
const task_status_model_1 = require("../task-status/task-status.model");
const task_status_service_1 = require("../task-status/task-status.service");
const task_priority_model_1 = require("../task-priority/task-priority.model");
const task_type_model_1 = require("../task-type/task-type.model");
const not_found_interceptor_1 = require("../interceptor/not-found.interceptor");
const all_exceptions_filter_1 = require("../filters/all-exceptions.filter");
const task_comment_model_1 = require("./task-comment/task-comment.model");
const create_task_comment_dto_1 = require("./task-comment/dto/create-task-comment.dto");
const TaskAvailable_guard_1 = require("./TaskAvailable.guard");
let TasksController = class TasksController {
    constructor(taskService, taskStatusService) {
        this.taskService = taskService;
        this.taskStatusService = taskStatusService;
    }
    createTask(dto) {
        return this.taskService.create(dto);
    }
    getTask(id) {
        return this.taskService.findOne(id);
    }
    getAllByAuthor(userId) {
        return this.taskService.findAllByAuthor(userId);
    }
    getAllByProject(projectId) {
        return this.taskService.findAllByProject(projectId);
    }
    update(id, updateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }
    remove(id) {
        return this.taskService.remove(+id);
    }
    getStatuses() {
        return this.taskStatusService.findAll();
    }
    getPiorities() {
        return this.taskService.getAllPriorities();
    }
    getAllTypes() {
        return this.taskService.getAllTypes();
    }
    addComment(comment) {
        return this.taskService.addComment(comment);
    }
    getComments(id) {
        return this.taskService.getComments(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create task' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_model_1.Task] }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.UseGuards)(task_guard_1.TaskGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, swagger_1.ApiOperation)({ summary: 'Get task' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_model_1.Task] }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get task by author' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_model_1.Task] }),
    (0, common_1.Get)('/author/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByAuthor", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, swagger_1.ApiOperation)({ summary: 'Get task from project' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_model_1.Task] }),
    (0, common_1.Get)('/project/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllByProject", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, swagger_1.ApiOperation)({ summary: 'Update task' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: task_model_1.Task }),
    (0, common_1.Patch)('/:id'),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Task deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Task statuses' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_status_model_1.TaskStatus] }),
    (0, common_1.Get)('/statuses/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getStatuses", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Task priorities' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_priority_model_1.TaskPriority] }),
    (0, common_1.Get)('/priorities/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getPiorities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Task types' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_type_model_1.TaskType] }),
    (0, common_1.Get)('/types/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTypes", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, swagger_1.ApiOperation)({ summary: 'Created comment' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: task_comment_model_1.TaskComment }),
    (0, common_1.Patch)('/comment/add'),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_comment_dto_1.CreateTaskCommentDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)(TaskAvailable_guard_1.TaskAvailable),
    (0, swagger_1.ApiOperation)({ summary: 'Comment list' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_comment_model_1.TaskComment] }),
    (0, common_1.Get)(':id/comment/all'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getComments", null);
TasksController = __decorate([
    (0, swagger_1.ApiTags)('Tasks'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(not_found_interceptor_1.NotFoundInterceptor),
    (0, common_1.UseFilters)(new all_exceptions_filter_1.AllException()),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TasksService,
        task_status_service_1.TaskStatusService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=task.controller.js.map