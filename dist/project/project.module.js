"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const project_comment_module_1 = require("./project-comment/project-comment.module");
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../user/users.model");
const task_model_1 = require("../task/task.model");
const project_model_1 = require("./project.model");
const project_status_model_1 = require("./project-status/project-status.model");
const project_status_module_1 = require("./project-status/project-status.module");
const users_module_1 = require("../user/users.module");
const project_comment_model_1 = require("./project-comment/project-comment.model");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
        imports: [
            users_module_1.UsersModule,
            project_status_module_1.ProjectStatusModule,
            project_comment_module_1.ProjectCommentModule,
            sequelize_1.SequelizeModule.forFeature([
                project_status_model_1.ProjectStatus,
                project_model_1.Project,
                users_model_1.User,
                task_model_1.Task,
                project_comment_model_1.ProjectComment,
            ]),
        ],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map