"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./user/users.module");
const config_1 = require("@nestjs/config");
const users_model_1 = require("./user/users.model");
const roles_module_1 = require("./roles/roles.module");
const roles_model_1 = require("./roles/roles.model");
const user_roles_model_1 = require("./roles/user-roles.model");
const auth_module_1 = require("./auth/auth.module");
const task_module_1 = require("./task/task.module");
const task_model_1 = require("./task/task.model");
const task_status_module_1 = require("./task-status/task-status.module");
const task_status_model_1 = require("./task-status/task-status.model");
const project_module_1 = require("./project/project.module");
const project_tasks_1 = require("./project/models/project-tasks");
const project_model_1 = require("./project/project.model");
const project_team_1 = require("./project/models/project-team");
const project_status_model_1 = require("./project/project-status/project-status.model");
const project_status_module_1 = require("./project/project-status/project-status.module");
const task_type_model_1 = require("./task-type/task-type.model");
const task_priority_model_1 = require("./task-priority/task-priority.model");
const task_priority_module_1 = require("./task-priority/task-priority.module");
const project_comment_model_1 = require("./project/project-comment/project-comment.model");
const task_comment_model_1 = require("./task/task-comment/task-comment.model");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.dev.env',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
            }),
            sequelize_1.SequelizeModule.forRoot({
                host: '0.0.0.0',
                password: '',
                dialect: 'sqlite',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                },
                storage: './db.sqlite',
                autoLoadModels: true,
                models: [
                    project_comment_model_1.ProjectComment,
                    task_comment_model_1.TaskComment,
                    task_priority_model_1.TaskPriority,
                    project_status_model_1.ProjectStatus,
                    project_model_1.Project,
                    project_tasks_1.ProjectTask,
                    project_team_1.ProjectTeam,
                    task_type_model_1.TaskType,
                    task_status_model_1.TaskStatus,
                    users_model_1.User,
                    roles_model_1.Role,
                    user_roles_model_1.UserRoles,
                    task_model_1.Task,
                ],
            }),
            task_priority_module_1.TaskPriorityModule,
            task_status_module_1.TaskStatusModule,
            project_module_1.ProjectModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            task_module_1.TasksModule,
            task_status_module_1.TaskStatusModule,
            project_module_1.ProjectModule,
            project_status_module_1.ProjectStatusModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map