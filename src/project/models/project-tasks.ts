import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from '../../tasks/task.model';
import { Project } from '../project.model';

@Table({ tableName: 'project_task', createdAt: false, updatedAt: false })
export class ProjectTasks extends Model<ProjectTasks> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;
}
