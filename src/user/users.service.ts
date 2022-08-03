import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserModel } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserModel> {
    const user = await this.userRepository.create({
      ...dto,
      isActive: false,
      hashCode: uuidv4(),
    });
    return user;
  }

  async findOne(id) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      throw new HttpException(
        'user not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  async findByIds(ids) {
    const users = await this.userRepository.findAll({ where: { id: ids } });
    if (users?.length) {
      throw new HttpException(
        'users not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    if (user) {
      throw new HttpException(
        'users not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'user or role not found',
      HttpStatus.NOT_FOUND,
    );
  }

  async makeActive(hashCode: string) {
    const user = await this.userRepository.findOne({
      where: { hashCode },
    });
    user.hashCode = null;
    user.isActive = true;
    await user.save();
    return user;
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    await user.save();
    return user;
  }
}
