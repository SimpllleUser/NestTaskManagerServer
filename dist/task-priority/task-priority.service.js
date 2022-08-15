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
exports.TaskPriorityService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const task_priority_model_1 = require("./task-priority.model");
const _ = require("lodash");
let TaskPriorityService = class TaskPriorityService {
    constructor(taskPriorityaskRepository) {
        this.taskPriorityaskRepository = taskPriorityaskRepository;
        this.priorities = [
            { name: 'hight', value: 1 },
            { name: 'normal', value: 2 },
            { name: 'low', value: 3 },
        ];
    }
    async create(dto) {
        const priorityTask = await this.taskPriorityaskRepository.create(dto);
        return priorityTask;
    }
    async findAll() {
        const priorityTasks = await this.taskPriorityaskRepository.findAll();
        return priorityTasks;
    }
    async findOne(id) {
        const priority = await this.taskPriorityaskRepository.findByPk(id);
        if (!priority) {
            throw new common_1.HttpException('not found priority', common_1.HttpStatus.NOT_FOUND);
        }
        return priority;
    }
    async getTypeByName(name) {
        const priority = await this.taskPriorityaskRepository.findOne({
            where: { name },
        });
        if (!priority) {
            throw new common_1.HttpException('not found priority', common_1.HttpStatus.NOT_FOUND);
        }
        return priority;
    }
    async onModuleInit() {
        await this.initPriorities();
    }
    async initPriorities() {
        const priorities = await this.findAll();
        const notExistPriorities = this.getNotExistPriority(priorities);
        if (priorities === null || priorities === void 0 ? void 0 : priorities.length)
            return;
        await Promise.all(notExistPriorities.map((priority) => this.create(priority)));
    }
    getNotExistPriority(existTypes) {
        const notExistsPriority = this.priorities.filter((type) => !existTypes.find(({ name }) => type === name));
        return notExistsPriority;
    }
    existPriority(id) {
        const exist = _.find(this.priorities, { value: id });
        if (!exist)
            throw new common_1.HttpException('not found priority', common_1.HttpStatus.NOT_FOUND);
        return exist;
    }
};
TaskPriorityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_priority_model_1.TaskPriority)),
    __metadata("design:paramtypes", [Object])
], TaskPriorityService);
exports.TaskPriorityService = TaskPriorityService;
//# sourceMappingURL=task-priority.service.js.map