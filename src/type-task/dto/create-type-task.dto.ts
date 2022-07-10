import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateTypeTaskDto {
  @ApiProperty({ example: 'name', description: 'Some name of type' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  readonly name: string;
  @ApiProperty({ example: 'Some number value', description: 'Some number' })
  @IsInt()
  @Min(1)
  @IsPositive()
  readonly value: number;
}
