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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
const roles_service_1 = require("../roles/roles.service");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async createUser(dto) {
        const user = await this.userRepository.create(Object.assign(Object.assign({}, dto), { isActive: false, hashCode: (0, uuid_1.v4)() }));
        return user;
    }
    async findOne(id) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findByIds(ids) {
        const users = await this.userRepository.findAll({ where: { id: ids } });
        return users;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
    async getUserByEmail(login) {
        const user = await this.userRepository.findOne({
            where: { login },
            include: { all: true },
        });
        return user;
    }
    async addRole(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (!role || !user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new common_1.HttpException('user or role not found', common_1.HttpStatus.NOT_FOUND);
    }
    async makeActive(hashCode) {
        const user = await this.userRepository.findOne({
            where: { hashCode },
        });
        user.hashCode = null;
        user.isActive = true;
        await user.save();
        return user;
    }
    async ban(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        }
        await user.save();
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map