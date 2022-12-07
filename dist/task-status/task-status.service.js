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
const constants_1 = require("../utils/constants");
let TaskStatusService = class TaskStatusService {
    constructor(taskStatusRepository) {
        this.taskStatusRepository = taskStatusRepository;
        this.statuses = [
            constants_1.STATUS.LOW,
            constants_1.STATUS.NORMAL,
            constants_1.STATUS.MEDIUM,
            constants_1.STATUS.HIGHT,
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
        return status;
    }
    async getStatusByName(name) {
        const status = await this.taskStatusRepository.findOne({
            where: { name },
        });
        return status;
    }
    async onModuleInit() {
        await this.initStatuses();
    }
    async initStatuses() {
        const existStatuses = await this.findAll();
        const notExistTypes = _.differenceBy(this.statuses, existStatuses.map(({ value, name }) => ({ value, name })), 'name');
        if (!(notExistTypes === null || notExistTypes === void 0 ? void 0 : notExistTypes.length))
            return;
        await Promise.all(notExistTypes.map((status) => this.create(status)));
    }
    existStatus(id) {
        return Boolean(_.find(this.statuses, { value: id }).value);
    }
    getNotExistStatuses(existStatuses) {
        return this.statuses.filter((status) => !existStatuses.find(({ name }) => status === name));
    }
};
TaskStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_status_model_1.TaskStatus)),
    __metadata("design:paramtypes", [Object])
], TaskStatusService);
exports.TaskStatusService = TaskStatusService;
//# sourceMappingURL=task-status.service.js.map