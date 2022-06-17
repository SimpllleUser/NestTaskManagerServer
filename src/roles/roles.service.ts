import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
  async getAll() {
    const role = await this.roleRepository.findAll();
    return role;
  }
  // async onModuleInit(): Promise<void> {
  //   const roles = [
  //     {
  //       value: 'ADMIN',
  //       description: 'is admin',
  //     },
  //     {
  //       value: 'USER',
  //       description: 'is user',
  //     },
  //   ];
  //   const existsRoles = await this.getAll();
  //   if (!existsRoles.length) return;
  //   roles.map((role: CreateRoleDto) => this.createRole(role));
  // }
}
