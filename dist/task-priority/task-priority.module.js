"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorityModule = void 0;
const common_1 = require("@nestjs/common");
const task_priority_service_1 = require("./task-priority.service");
const sequelize_1 = require("@nestjs/sequelize");
const task_priority_model_1 = require("./task-priority.model");
let TaskPriorityModule = class TaskPriorityModule {
};
TaskPriorityModule = __decorate([
    (0, common_1.Module)({
        providers: [task_priority_service_1.TaskPriorityService],
        imports: [sequelize_1.SequelizeModule.forFeature([task_priority_model_1.TaskPriority])],
        exports: [task_priority_service_1.TaskPriorityService],
    })
], TaskPriorityModule);
exports.TaskPriorityModule = TaskPriorityModule;
//# sourceMappingURL=task-priority.module.js.map