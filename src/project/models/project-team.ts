import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from '../project.model';
import { User } from '../../user/users.model';

@Table({ tableName: 'project_team', createdAt: false, updatedAt: false })
export class ProjectTeam extends Model<ProjectTeam> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;
}
