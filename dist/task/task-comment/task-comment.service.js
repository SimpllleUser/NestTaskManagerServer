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
exports.TaskCommentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../user/users.model");
const task_comment_model_1 = require("./task-comment.model");
let TaskCommentService = class TaskCommentService {
    constructor(taskCommentRepository) {
        this.taskCommentRepository = taskCommentRepository;
    }
    async getOneById(id) {
        const comment = await this.taskCommentRepository.findOne({
            where: { id },
            include: [{ model: users_model_1.User }],
        });
        return comment;
    }
    async create(dto) {
        const createdComment = await this.taskCommentRepository.create(dto);
        const comment = await this.getOneById(createdComment.id);
        return comment;
    }
    async findAllByTaskId(taskId) {
        const comments = await this.taskCommentRepository.findAll({
            where: { taskId },
            include: [{ model: users_model_1.User }],
        });
        return comments;
    }
    async onModuleInit() { }
};
TaskCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_comment_model_1.TaskComment)),
    __metadata("design:paramtypes", [Object])
], TaskCommentService);
exports.TaskCommentService = TaskCommentService;
//# sourceMappingURL=task-comment.service.js.map