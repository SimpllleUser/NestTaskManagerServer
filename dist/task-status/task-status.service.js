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
exports.TaskStatusService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const task_status_model_1 = require("./task-status.model");
const _ = require("lodash");
let TaskStatusService = class TaskStatusService {
    constructor(taskStatusRepository) {
        this.taskStatusRepository = taskStatusRepository;
        this.statuses = [
            {
                name: 'open',
                value: 1,
            },
            {
                name: 'in progress',
                value: 2,
            },
            {
                name: 'done',
                value: 3,
            },
            {
                name: 'todo',
                value: 4,
            },
        ];
    }
    async create(dto) {
        const statusProject = await this.taskStatusRepository.create(dto);
        return statusProject;
    }
    async findAll() {
        const statusesProject = await this.taskStatusRepository.findAll();
        return statusesProject;
    }
    async findOne(id) {
        const status = await this.taskStatusRepository.findByPk(id);
        if (!status) {
            throw new common_1.HttpException('not found status', common_1.HttpStatus.NOT_FOUND);
        }
        return status;
    }
    async getStatusByName(name) {
        const status = await this.taskStatusRepository.findOne({
            where: { name },
        });
        if (!status) {
            throw new common_1.HttpException('not found status', common_1.HttpStatus.NOT_FOUND);
        }
        return status;
    }
    async onModuleInit() {
        const statuses = await this.findAll();
        const notExistStatuses = this.getNotExistStatuses(statuses);
        if (statuses === null || statuses === void 0 ? void 0 : statuses.length)
            return;
        await Promise.all(notExistStatuses.map((status) => this.create(status)));
    }
    existStatus(id) {
        const exist = _.find(this.statuses, { value: id });
        if (!exist)
            throw new common_1.HttpException('not found status', common_1.HttpStatus.NOT_FOUND);
        return exist;
    }
    getNotExistStatuses(existStatuses) {
        const notExistsStatus = this.statuses.filter((status) => !existStatuses.find(({ name }) => status === name));
        return notExistsStatus;
    }
};
TaskStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_status_model_1.TaskStatus)),
    __metadata("design:paramtypes", [Object])
], TaskStatusService);
exports.TaskStatusService = TaskStatusService;
//# sourceMappingURL=task-status.service.js.map