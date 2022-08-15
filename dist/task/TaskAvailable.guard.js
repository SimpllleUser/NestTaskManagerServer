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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAvailable = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const project_service_1 = require("../project/project.service");
const task_service_1 = require("./task.service");
let TaskAvailable = class TaskAvailable {
    constructor(jwtService, projectService, taskService) {
        this.jwtService = jwtService;
        this.projectService = projectService;
        this.taskService = taskService;
    }
    async canActivate(context) {
        var _a;
        const req = context.switchToHttp().getRequest();
        const taskId = ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id) || req.body.taskId;
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const { id: userId } = await this.jwtService.verify(token);
            const { projectId } = await this.taskService.findOne(taskId);
            const projects = await this.projectService.userExistOnProject({
                projectId,
                userId,
            });
            const exitsProject = Boolean(projects === null || projects === void 0 ? void 0 : projects.length);
            if (!exitsProject)
                new common_1.ConflictException({ message: 'User not have access to task' });
            return exitsProject;
        }
        catch (e) {
            new common_1.ConflictException({ message: 'User not have access to task' });
        }
    }
};
TaskAvailable = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        project_service_1.ProjectService,
        task_service_1.TasksService])
], TaskAvailable);
exports.TaskAvailable = TaskAvailable;
//# sourceMappingURL=TaskAvailable.guard.js.map