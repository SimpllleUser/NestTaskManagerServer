"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCommentModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const project_model_1 = require("../project.model");
const project_comment_model_1 = require("./project-comment.model");
const project_comment_service_1 = require("./project-comment.service");
let ProjectCommentModule = class ProjectCommentModule {
};
ProjectCommentModule = __decorate([
    (0, common_1.Module)({
        providers: [project_comment_service_1.ProjectCommentService],
        imports: [sequelize_1.SequelizeModule.forFeature([project_model_1.Project, project_comment_model_1.ProjectComment])],
        exports: [project_comment_service_1.ProjectCommentService],
    })
], ProjectCommentModule);
exports.ProjectCommentModule = ProjectCommentModule;
//# sourceMappingURL=project-comment.module.js.map