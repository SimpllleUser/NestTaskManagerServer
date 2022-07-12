import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PriorityCreationAttrs {
  name: string;
  value: number;
}

@Table({ tableName: 'task_priority' })
export class TaskPriority extends Model<TaskPriority, PriorityCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Priority ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'low', description: 'Some name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'Some number value' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: number;
}
