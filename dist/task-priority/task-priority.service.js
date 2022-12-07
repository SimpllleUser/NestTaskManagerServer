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
const constants_1 = require("../utils/constants");
const option_general_service_1 = require("../general-option/option-general.service");
let TaskPriorityService = class TaskPriorityService extends option_general_service_1.OptionGeneralService {
    constructor(taskPriorityaskRepository) {
        super([constants_1.PRIORITY.LOW, constants_1.PRIORITY.MEDIUM, constants_1.PRIORITY.HIGHT], taskPriorityaskRepository);
    }
};
TaskPriorityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_priority_model_1.TaskPriority)),
    __metadata("design:paramtypes", [Object])
], TaskPriorityService);
exports.TaskPriorityService = TaskPriorityService;
//# sourceMappingURL=task-priority.service.js.map