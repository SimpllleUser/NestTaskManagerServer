"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const sequelize_1 = require("@nestjs/sequelize");
const task_model_1 = require("./task.model");
const task_status_model_1 = require("../task-status/task-status.model");
const project_model_1 = require("../project/project.model");
const task_status_module_1 = require("../task-status/task-status.module");
const task_type_model_1 = require("../task-type/task-type.model");
const task_type_module_1 = require("../task-type/task-type.module");
const task_priority_model_1 = require("../task-priority/task-priority.model");
const task_priority_module_1 = require("../task-priority/task-priority.module");
const task_comment_module_1 = require("./task-comment/task-comment.module");
const project_module_1 = require("../project/project.module");
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    (0, common_1.Module)({
        providers: [task_service_1.TasksService],
        controllers: [task_controller_1.TasksController],
        imports: [
            task_status_module_1.TaskStatusModule,
            task_type_module_1.TypeTaskModule,
            task_priority_module_1.TaskPriorityModule,
            task_comment_module_1.TaskCommentModule,
            project_module_1.ProjectModule,
            sequelize_1.SequelizeModule.forFeature([
                task_priority_model_1.TaskPriority,
                task_type_model_1.TaskType,
                task_status_model_1.TaskStatus,
                task_model_1.Task,
                project_model_1.Project,
            ]),
        ],
    })
], TasksModule);
exports.TasksModule = TasksModule;
//# sourceMappingURL=task.module.js.map