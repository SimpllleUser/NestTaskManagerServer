import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TypeCreationAttrs {
  name: string;
  value: number;
}

@Table({ tableName: 'project_status' })
export class ProjectStatus extends Model<ProjectStatus, TypeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: number;
}
