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
import { Task } from '../tasks/task.model';
import { ProjectTeam } from './models/project-team';
import { StatusProject } from '../status-project/status-project.model';

interface ProjectCreationAttrs {
  title: string;
  description: string;
  authorId: number;
}

@Table({ tableName: 'project' })
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
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => StatusProject)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @BelongsTo(() => StatusProject)
  status: StatusProject;
}
