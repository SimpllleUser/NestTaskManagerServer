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
exports.Project = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../user/users.model");
const task_model_1 = require("../task/task.model");
const project_team_1 = require("./models/project-team");
const project_status_model_1 = require("./project-status/project-status.model");
const project_comment_model_1 = require("./project-comment/project-comment.model");
let Project = class Project extends sequelize_typescript_1.Model {
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
], Project.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Some-title', description: 'Must be uqniq value ' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN', description: 'description roles' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                title: 'string',
                description: 'string',
                authorId: 'number',
                typeId: 'number',
                priorityId: 'number',
                executorId: 'number',
            },
        ],
        description: 'description roles',
    }),
    (0, sequelize_typescript_1.HasMany)(() => task_model_1.Task),
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => project_comment_model_1.ProjectComment),
    __metadata("design:type", Array)
], Project.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => users_model_1.User, () => project_team_1.ProjectTeam),
    __metadata("design:type", Array)
], Project.prototype, "team", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Project.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Project.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => project_status_model_1.ProjectStatus),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Project.prototype, "statusId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => project_status_model_1.ProjectStatus),
    __metadata("design:type", project_status_model_1.ProjectStatus)
], Project.prototype, "status", void 0);
Project = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'project' })
], Project);
exports.Project = Project;
//# sourceMappingURL=project.model.js.map