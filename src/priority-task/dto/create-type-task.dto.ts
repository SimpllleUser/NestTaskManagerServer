import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateTypeTaskDto {
  @ApiProperty({ example: 'name', description: 'Some name' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Some value namber' })
  @IsPositive()
  @IsInt()
  @Min(1)
  readonly value: number;
}
