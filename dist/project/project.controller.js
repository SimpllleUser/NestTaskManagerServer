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
exports.ProjectController = void 0;
const create_project_comment_dto_1 = require("./project-comment/dto/create-project-comment.dto");
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const validation_pipe_1 = require("../pipes/validation.pipe");
const jwt_auth_guards_1 = require("../auth/jwt-auth-guards");
const swagger_1 = require("@nestjs/swagger");
const project_model_1 = require("./project.model");
const users_model_1 = require("../user/users.model");
const project_comment_model_1 = require("./project-comment/project-comment.model");
const project_status_model_1 = require("./project-status/project-status.model");
const ProjectAvailable_guard_1 = require("./ProjectAvailable.guard");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(createProjectDto) {
        return this.projectService.create(createProjectDto);
    }
    findAllByAuthor(id) {
        return this.projectService.findAllByAuthor(id);
    }
    findAllByAvailable(id) {
        return this.projectService.findAllAvailableForUser(id);
    }
    findOne(id) {
        return this.projectService.findOne(+id);
    }
    update(id, updateProjectDto) {
        return this.projectService.update(+id, updateProjectDto);
    }
    remove(id) {
        return this.projectService.remove(+id);
    }
    addUsers(id, body) {
        return this.projectService.addUsers(id, body);
    }
    deleteUsers(id, body) {
        return this.projectService.deleteUsers(id, body);
    }
    addUser(id, userId) {
        return this.projectService.addUser(id, userId);
    }
    deleteUser(id, userId) {
        return this.projectService.deleteUser(id, userId);
    }
    addComment(comment) {
        return this.projectService.addComment(comment);
    }
    getComments(id) {
        return this.projectService.getComments(id);
    }
    getProjectStatuses() {
        return this.projectService.getAllStatuses();
    }
    getUsersByProject(id) {
        return this.projectService.getUsersByProject(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create project' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: project_model_1.Project }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get projects by author' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [project_model_1.Project] }),
    (0, common_1.Get)('/author/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAllByAuthor", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get projects by author' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [project_model_1.Project] }),
    (0, common_1.Get)('/all/by-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAllByAvailable", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get project by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: project_model_1.Project }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update project' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: project_model_1.Project }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Added users list' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_model_1.User] }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Patch)(':id/users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleted users list' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_model_1.User] }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Delete)(':id/users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "deleteUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Added user to ptoject' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Patch)(':id/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleted user to ptoject' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Delete)(':id/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add comment to project' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: project_comment_model_1.ProjectComment }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Patch)('/comment/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_comment_dto_1.CreateProjectCommentDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all comments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [project_comment_model_1.ProjectComment] }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Get)(':id/comment/all'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all statuses' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [project_status_model_1.ProjectStatus] }),
    (0, common_1.Get)('statuses/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getProjectStatuses", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users by project' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [project_status_model_1.ProjectStatus] }),
    (0, common_1.UseGuards)(ProjectAvailable_guard_1.ProjectAvailable),
    (0, common_1.Get)(':id/users/all'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getUsersByProject", null);
ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Project'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map