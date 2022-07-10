import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { StatusTask } from '../task-status/task-status.model';
import { Project } from '../project/project.model';
import { TypeTask } from '../type-task/type-task.model';
import { PriorityTask } from '../task-priority/task-priority.model';
import { CreateTaskDto } from './dto/create-task.dto';

export interface TaskCreationAttrs {
  title: string;
  description: string;
  authorId: number;
  typeId: number;
  priorityId: number;
  executorId: number;
}

export const TaskExample = {
  title: 'string',
  description: 'string',
  authorId: 'number',
  typeId: 'number',
  priorityId: 'number',
  executorId: 'number',
};

export class CreateTaskBody {
  @ApiProperty()
  task: CreateTaskDto;
}

@Table({ tableName: 'tasks' })
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
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: '1', description: 'Some project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @ApiProperty({ example: '1', description: 'Some status task' })
  @ForeignKey(() => StatusTask)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @BelongsTo(() => StatusTask)
  status: StatusTask;

  @ApiProperty({ example: '1', description: 'Some type task' })
  @ForeignKey(() => TypeTask)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @BelongsTo(() => TypeTask)
  type: TypeTask;

  @ApiProperty({ example: '1', description: 'Some priority' })
  @ForeignKey(() => PriorityTask)
  @Column({ type: DataType.INTEGER })
  priorityId: number;

  @BelongsTo(() => PriorityTask)
  priority: TypeTask;

  @ApiProperty({ example: '1', description: 'Some user executor' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  executorId: number;

  @BelongsTo(() => User)
  executor: User;
}
