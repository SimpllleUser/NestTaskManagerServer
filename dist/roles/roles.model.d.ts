import { Model } from 'sequelize-typescript';
import { User } from '../user/users.model';
interface RoleCreationAttrs {
    value: string;
    description: string;
}
export declare class Role extends Model<Role, RoleCreationAttrs> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};
