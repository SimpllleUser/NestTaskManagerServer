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
exports.TaskGuard = void 0;
const common_1 = require("@nestjs/common");
const task_type_service_1 = require("../task-type/task-type.service");
const task_priority_service_1 = require("../task-priority/task-priority.service");
let TaskGuard = class TaskGuard {
    constructor(typeTaskService, priorityTaskService) {
        this.typeTaskService = typeTaskService;
        this.priorityTaskService = priorityTaskService;
    }
    async canActivate(context) {
        try {
            const reqBody = context.switchToHttp().getRequest().body;
            const priorities = await this.priorityTaskService.findAll();
            const types = await this.typeTaskService.findAll();
            const isValidType = types.some(({ id }) => id === reqBody.typeId);
            const isValidSPriority = priorities.some(({ id }) => id === reqBody.priorityId);
            return isValidSPriority && isValidType;
        }
        catch (error) {
            throw new common_1.HttpException('Invalid data fields', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
TaskGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_type_service_1.TaskTypeService,
        task_priority_service_1.TaskPriorityService])
], TaskGuard);
exports.TaskGuard = TaskGuard;
//# sourceMappingURL=task.guard.js.map