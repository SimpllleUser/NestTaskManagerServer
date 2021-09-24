import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface TypeCreationAttrs {
  name: string;
}

@Table({ tableName: 'status_task' })
export class StatusTask extends Model<StatusTask, TypeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
