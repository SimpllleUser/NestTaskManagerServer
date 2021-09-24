import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { Task } from '../tasks/task.model';
import { ProjectTasks } from './models/project-tasks';
import { ProjectTeam } from './models/project-team';

interface ProjectCreationAttrs {
  title: string;
  description: string;
  userId: number;
}

interface Test {
  id: string;
  email: string;
  isActive: boolean;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Уникальное Значение роли ' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Task)
  tasks: Task[];

  @BelongsToMany(() => User, () => ProjectTeam)
  team: User[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: Test;
}
