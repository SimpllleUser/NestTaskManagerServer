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
exports.Task = exports.CreateTaskBody = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../user/users.model");
const task_status_model_1 = require("../task-status/task-status.model");
const project_model_1 = require("../project/project.model");
const task_type_model_1 = require("../task-type/task-type.model");
const task_priority_model_1 = require("../task-priority/task-priority.model");
const create_task_dto_1 = require("./dto/create-task.dto");
const task_comment_model_1 = require("./task-comment/task-comment.model");
class CreateTaskBody {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", create_task_dto_1.CreateTaskDto)
], CreateTaskBody.prototype, "task", void 0);
exports.CreateTaskBody = CreateTaskBody;
let Task = class Task extends sequelize_typescript_1.Model {
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
], Task.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name', description: 'Some task name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'description', description: 'Some task description' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some user id' }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false }),
    __metadata("design:type", Number)
], Task.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Task.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some project id' }),
    (0, sequelize_typescript_1.ForeignKey)(() => project_model_1.Project),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => project_model_1.Project),
    __metadata("design:type", project_model_1.Project)
], Task.prototype, "project", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => task_comment_model_1.TaskComment),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some status task' }),
    (0, sequelize_typescript_1.ForeignKey)(() => task_status_model_1.TaskStatus),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Task.prototype, "statusId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => task_status_model_1.TaskStatus),
    __metadata("design:type", task_status_model_1.TaskStatus)
], Task.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some type task' }),
    (0, sequelize_typescript_1.ForeignKey)(() => task_type_model_1.TaskType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Task.prototype, "typeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => task_type_model_1.TaskType),
    __metadata("design:type", task_type_model_1.TaskType)
], Task.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some priority' }),
    (0, sequelize_typescript_1.ForeignKey)(() => task_priority_model_1.TaskPriority),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Task.prototype, "priorityId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => task_priority_model_1.TaskPriority),
    __metadata("design:type", task_type_model_1.TaskType)
], Task.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some user executor' }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Task.prototype, "executorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Task.prototype, "executor", void 0);
Task = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'task' })
], Task);
exports.Task = Task;
//# sourceMappingURL=task.model.js.map