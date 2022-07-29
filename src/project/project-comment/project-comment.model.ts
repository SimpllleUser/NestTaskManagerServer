import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../project.model';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';

@Table({ tableName: 'project_comment' })
export class ProjectComment extends Model<
  ProjectComment,
  CreateProjectCommentDto
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
  @Column({ type: DataType.INTEGER, unique: false })
  authorId: number;

  @ApiProperty({ example: '1', description: 'Some project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;
}
