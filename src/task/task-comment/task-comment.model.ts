import { User } from '../../user/users.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { Task } from '../task.model';

@Table({ tableName: 'task_comment' })
export class TaskComment extends Model<
  TaskComment,
  CreateTaskCommentDto
> {
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
  body: string;

  @ApiProperty({ example: '1', description: 'Some user id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: false })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: '1', description: 'Some project id' })
  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;
}
