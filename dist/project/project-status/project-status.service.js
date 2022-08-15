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
exports.ProjectStatusService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const project_status_model_1 = require("./project-status.model");
let ProjectStatusService = class ProjectStatusService {
    constructor(projectStatusRepository) {
        this.projectStatusRepository = projectStatusRepository;
    }
    async create(dto) {
        const statusProject = await this.projectStatusRepository.create(dto);
        return statusProject;
    }
    async getAll() {
        const statusesProject = await this.projectStatusRepository.findAll();
        return statusesProject;
    }
    async findOne(id) {
        const status = await this.projectStatusRepository.findByPk(id);
        if (!status) {
            throw new common_1.HttpException('not found status', common_1.HttpStatus.NOT_FOUND);
        }
        return status;
    }
    async getStatusByName(name) {
        const status = await this.projectStatusRepository.findOne({
            where: { name },
        });
        if (!status) {
            throw new common_1.HttpException('not found status', common_1.HttpStatus.NOT_FOUND);
        }
        return status;
    }
    async onModuleInit() {
        const statuses = await this.getAll();
        const notExistStatuses = this.getNotExistStatuses(statuses);
        if (statuses === null || statuses === void 0 ? void 0 : statuses.length)
            return;
        await Promise.all(notExistStatuses.map((status) => this.create(status)));
    }
    getNotExistStatuses(existStatuses) {
        const statuses = [
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
        const notExistsStatus = statuses.filter((status) => !existStatuses.find(({ name }) => status === name));
        return notExistsStatus;
    }
};
ProjectStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(project_status_model_1.ProjectStatus)),
    __metadata("design:paramtypes", [Object])
], ProjectStatusService);
exports.ProjectStatusService = ProjectStatusService;
//# sourceMappingURL=project-status.service.js.map