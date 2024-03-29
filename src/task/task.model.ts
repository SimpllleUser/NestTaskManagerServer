import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/users.model';
import { TaskStatus } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { TaskType } from '../task-type/task-type.model';
import { TaskPriority } from '../task-priority/task-priority.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskComment } from './task-comment/task-comment.model';

export interface TaskCreationAttrs {
  title: string;
  description: string;
  authorId: number;
  typeId: number;
  priorityId: number;
  statusId: number;
  executorId: number;
}

export class CreateTaskBody {
  @ApiProperty()
  task: CreateTaskDto;
}

@Table({ tableName: 'task' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'Some task name' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @ApiProperty({ example: 'description', description: 'Some task description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: '1', description: 'Some user id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: false })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: '1', description: 'Some project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @HasMany(() => TaskComment)
  comments: TaskComment[];

  @ApiProperty({ example: '1', description: 'Some status task' })
  @ForeignKey(() => TaskStatus)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  statusId: number;

  @BelongsTo(() => TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: '1', description: 'Some type task' })
  @ForeignKey(() => TaskType)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  typeId: number;

  @BelongsTo(() => TaskType)
  type: TaskType;

  @ApiProperty({ example: '1', description: 'Some priority' })
  @ForeignKey(() => TaskPriority)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  priorityId: number;

  @BelongsTo(() => TaskPriority)
  priority: TaskType;

  @ApiProperty({ example: '1', description: 'Some user executor' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  executorId: number;

  @BelongsTo(() => User)
  executor: User;
}
