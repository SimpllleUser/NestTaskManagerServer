import { Column, DataType, Model } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TypeCreationAttrs {
  name: string;
  value: number;
}

export class OptionModel extends Model<OptionModel, TypeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Status ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'some name of option', description: 'Some name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'Some number value' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: number;
}
