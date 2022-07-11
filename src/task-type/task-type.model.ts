import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TypeCreationAttrs {
  name: string;
  value: number;
}

@Table({ tableName: 'task_type' })
export class TaskType extends Model<TaskType, TypeCreationAttrs> {
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
