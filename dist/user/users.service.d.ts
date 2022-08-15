import { User, UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<UserModel>;
    findOne(id: any): Promise<User>;
    findByIds(ids: any): Promise<User[]>;
    getAllUsers(): Promise<User[]>;
    getUserByEmail(login: string): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    makeActive(hashCode: string): Promise<User>;
    ban(dto: BanUserDto): Promise<User>;
}
