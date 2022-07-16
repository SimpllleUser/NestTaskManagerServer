import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'title', description: 'Some title' })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  readonly title: string;
  @ApiProperty({ example: 'description', description: 'Some description' })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  readonly description: string;
  @ApiProperty({ example: '1', description: 'Some id user' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  readonly statusId: number;
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 10000000000,
  })
  readonly authorId: number;
}
