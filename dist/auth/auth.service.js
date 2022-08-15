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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../user/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        return this.getUserAuth(user);
    }
    async registration(userDto) {
        const candidate = await this.userService.getUserByEmail(userDto.login);
        if (candidate)
            throw new common_1.HttpException('User with this email is exist in system', common_1.HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        return this.getUserAuth(user);
    }
    generateToken(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.login);
        const passwordEqual = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEqual) {
            return user;
        }
        else {
            throw new common_1.UnauthorizedException({
                message: 'Not correct data auth email or password',
            });
        }
    }
    getUserAuth(user) {
        const { id, name, login } = user;
        return Object.assign({ id, name, login }, this.generateToken(user));
    }
    dekodeToken(token) {
        return this.jwtService.decode(token);
    }
    ;
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map