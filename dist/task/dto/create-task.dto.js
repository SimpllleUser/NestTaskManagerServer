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
exports.CreateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTaskDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'title', description: 'Some title' }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.Length)(1, 1000, { message: 'Не меньше 1' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'description', description: 'Some description' }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.Length)(4, 1000, { message: 'Не меньше 4 и не больше 1000' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some author id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "authorId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some type id' }),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some priority id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "priorityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some executor id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "executorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some status id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some project id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "projectId", void 0);
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map