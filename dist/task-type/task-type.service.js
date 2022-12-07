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
exports.TaskTypeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const task_type_model_1 = require("./task-type.model");
const _ = require("lodash");
const constants_1 = require("../utils/constants");
let TaskTypeService = class TaskTypeService {
    constructor(taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
        this.types = [
            constants_1.TYPE.LOW,
            constants_1.TYPE.MEDIUM,
            constants_1.TYPE.HIGHT,
        ];
    }
    async create(dto) {
        const typeTask = await this.taskTypeRepository.create(dto);
        return typeTask;
    }
    async findAll() {
        const typeTasks = await this.taskTypeRepository.findAll();
        return typeTasks;
    }
    async findOne(id) {
        const type = await this.taskTypeRepository.findByPk(id);
        if (!type) {
            throw new common_1.HttpException('not found type', common_1.HttpStatus.NOT_FOUND);
        }
        return type;
    }
    async getTypeByName(name) {
        const type = await this.taskTypeRepository.findOne({
            where: { name },
        });
        if (!type) {
            throw new common_1.HttpException('not found type', common_1.HttpStatus.NOT_FOUND);
        }
        return type;
    }
    async onModuleInit() {
        await this.initTypes();
    }
    async initTypes() {
        const existTypes = await this.findAll();
        const notExistTypes = _.differenceBy(this.types, existTypes.map(({ value, name }) => ({ value, name })), 'name');
        if (!(notExistTypes === null || notExistTypes === void 0 ? void 0 : notExistTypes.length))
            return;
        await Promise.all(notExistTypes.map((type) => this.create(type)));
    }
    existType(id) {
        return Boolean(_.find(this.types, { value: id }).value);
    }
    getNotExistTypes(existTypes) {
        return this.types.filter((type) => !existTypes.find(({ name }) => type === name));
    }
};
TaskTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_type_model_1.TaskType)),
    __metadata("design:paramtypes", [Object])
], TaskTypeService);
exports.TaskTypeService = TaskTypeService;
//# sourceMappingURL=task-type.service.js.map