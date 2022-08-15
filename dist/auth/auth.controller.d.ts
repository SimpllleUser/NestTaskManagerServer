import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto copy';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginUserDto): Promise<import("../user/users.model").UserAuth>;
    registration(userDto: CreateUserDto): Promise<import("../user/users.model").UserAuth>;
}
