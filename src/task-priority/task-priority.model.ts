import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PriorityCreationAttrs {
  name: string;
  value: number;
}

@Table({ tableName: 'task_priority' })
export class TaskPriority extends Model<TaskPriority, PriorityCreationAttrs> {
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
