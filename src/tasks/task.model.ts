import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { StatusTask } from '../status-task/status-task.model';
import { Project } from '../project/project.model';
import { TypeTask } from '../type-task/type-task.model';
import { PriorityTask } from '../priority-task/priority-task.model';

interface TaskCreationAttrs {
  title: string;
  description: string;
  authorId: number;
  typeId: number;
  priorityId: number;
  executorId: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => StatusTask)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @BelongsTo(() => StatusTask)
  status: StatusTask;

  @ForeignKey(() => TypeTask)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @BelongsTo(() => TypeTask)
  type: TypeTask;

  @ForeignKey(() => PriorityTask)
  @Column({ type: DataType.INTEGER })
  priorityId: number;

  @BelongsTo(() => PriorityTask)
  priority: TypeTask;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  executorId: number;

  @BelongsTo(() => User)
  executor: User;
}
