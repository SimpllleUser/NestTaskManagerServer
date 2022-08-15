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
exports.CreateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProjectDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'title', description: 'Some title' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.Length)(1, 1000, { message: 'Не меньше 1' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'description', description: 'Some description' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.Length)(1, 1000, { message: 'Не меньше 1' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Some id user' }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
    }),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 10000000000,
    }),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "authorId", void 0);
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map