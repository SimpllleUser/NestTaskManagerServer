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
import { User } from '../user/users.model';
import { Task } from '../tasks/task.model';
import { ProjectTeam } from './models/project-team';
import { StatusProject } from '../project-status/project-status.model';

interface ProjectCreationAttrs {
  title: string;
  description: string;
  authorId: number;
}
@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Some-title', description: 'Must be uqniq value ' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'ADMIN', description: 'description roles' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: [
      {
        title: 'string',
        description: 'string',
        authorId: 'number',
        typeId: 'number',
        priorityId: 'number',
        executorId: 'number',
      },
    ],
    description: 'description roles',
  })
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
