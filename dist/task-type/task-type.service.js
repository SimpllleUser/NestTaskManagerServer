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
let TaskTypeService = class TaskTypeService {
    constructor(taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
        this.types = [
            { name: 'bug', value: 4 },
            { name: 'feature', value: 2 },
            { name: 'fix', value: 3 },
            { name: 'planning', value: 1 },
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
        const types = await this.findAll();
        const notExistTypes = this.getNotExistTypes(types);
        if (types === null || types === void 0 ? void 0 : types.length)
            return;
        await Promise.all(notExistTypes.map((type) => this.create(type)));
    }
    existType(id) {
        const exist = _.find(this.types, { value: id });
        if (!exist)
            throw new common_1.HttpException('not found type', common_1.HttpStatus.NOT_FOUND);
        return exist;
    }
    getNotExistTypes(existTypes) {
        const notExistsStatus = this.types.filter((type) => !existTypes.find(({ name }) => type === name));
        return notExistsStatus;
    }
};
TaskTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_type_model_1.TaskType)),
    __metadata("design:paramtypes", [Object])
], TaskTypeService);
exports.TaskTypeService = TaskTypeService;
//# sourceMappingURL=task-type.service.js.map