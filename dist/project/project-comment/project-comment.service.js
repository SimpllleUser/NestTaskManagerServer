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
exports.ProjectCommentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../user/users.model");
const project_comment_model_1 = require("./project-comment.model");
let ProjectCommentService = class ProjectCommentService {
    constructor(projectCommentRepository) {
        this.projectCommentRepository = projectCommentRepository;
    }
    async getOneById(id) {
        const comment = await this.projectCommentRepository.findOne({
            where: { id },
            include: [{ model: users_model_1.User }],
        });
        return comment;
    }
    async create(dto) {
        const createdComment = await this.projectCommentRepository.create(dto);
        const comment = await this.getOneById(createdComment.id);
        return comment;
    }
    async findAllByProjectId(projectId) {
        const comments = await this.projectCommentRepository.findAll({
            where: { projectId },
            include: [{ model: users_model_1.User }],
        });
        return comments;
    }
    async onModuleInit() { }
};
ProjectCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(project_comment_model_1.ProjectComment)),
    __metadata("design:paramtypes", [Object])
], ProjectCommentService);
exports.ProjectCommentService = ProjectCommentService;
//# sourceMappingURL=project-comment.service.js.map