import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Task } from '../tasks/task.model';
import { Project } from '../project/project.model';

interface UserCreationAttrs {
  login: string;
  name: string;
  password: string;
  isActive: boolean;
  hashCode: string;
}

export interface UserModel {
  id: number;
  login: string;
  name: string;
  password: string;
  hashCode: string;
  isActive: boolean;
  roles: Role[];
  tasks: Task[];
  projects: Project[];
}
export interface UserAuth {
  id: number;
  login: string;
  name: string;
  token: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user@example.com', description: 'email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;
  @ApiProperty({ example: '12345678', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: true })
  hashCode: string;
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
  @HasMany(() => Task)
  tasks: Task[];
  @HasMany(() => Project)
  projects: Project[];
}
