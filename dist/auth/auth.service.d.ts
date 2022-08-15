import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from 'src/user/users.model';
import { LoginUserDto } from 'src/user/dto/login-user.dto copy';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: LoginUserDto): Promise<UserAuth>;
    registration(userDto: CreateUserDto): Promise<UserAuth>;
    private generateToken;
    private validateUser;
    private getUserAuth;
    dekodeToken(token: string): string | {
        [key: string]: any;
    };
}
