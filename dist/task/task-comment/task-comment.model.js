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
exports.TaskComment = void 0;
const users_model_1 = require("../../user/users.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const task_model_1 = require("../task.model");
let TaskComment = class TaskComment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Uniq identificator' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], TaskComment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name', description: 'Some task name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], TaskComment.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some user id' }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false }),
    __metadata("design:type", Number)
], TaskComment.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], TaskComment.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some project id' }),
    (0, sequelize_typescript_1.ForeignKey)(() => task_model_1.Task),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], TaskComment.prototype, "taskId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => task_model_1.Task),
    __metadata("design:type", task_model_1.Task)
], TaskComment.prototype, "task", void 0);
TaskComment = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'task_comment' })
], TaskComment);
exports.TaskComment = TaskComment;
//# sourceMappingURL=task-comment.model.js.map