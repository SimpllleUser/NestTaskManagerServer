import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserModel, UserAuth } from 'src/users/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto copy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.getUserAuth(user);
  }

  async registration(userDto: CreateUserDto): Promise<UserAuth> {
    const candidate = await this.userService.getUserByEmail(userDto.login);
    if (candidate)
      throw new HttpException(
        'User with this email is exist in system',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.getUserAuth(user);
  }

  private generateToken(user) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.login);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    } else {
      throw new UnauthorizedException({
        message: 'Not correct data auth email or password',
      });
    }
  }
  private getUserAuth(user: UserModel): UserAuth {
    const { id, name, login }: UserModel = user;
    return { id, name, login, ...this.generateToken(user) };
  }
}
