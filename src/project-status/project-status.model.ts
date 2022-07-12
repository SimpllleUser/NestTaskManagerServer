import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TypeCreationAttrs {
  name: string;
  value: number;
}

@Table({ tableName: 'project_status' })
export class ProjectStatus extends Model<ProjectStatus, TypeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Status ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'open', description: 'Some name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'Some number value' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: number;
}
