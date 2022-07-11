import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'title', description: 'Some title' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  title: string;
  @ApiProperty({ example: 'description', description: 'Some description' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 1000, { message: 'Не меньше 4 и не больше 1000' })
  description: string;
  @ApiProperty({ example: '1', description: 'Some author id' })
  @IsInt()
  @Min(1)
  authorId: number;
  @IsInt()
  @Min(1)
  @IsPositive()
  @ApiProperty({ example: '1', description: 'Some type id' })
  typeId: number;
  @ApiProperty({ example: '1', description: 'Some priority id' })
  @IsInt()
  @Min(1)
  @IsPositive()
  priorityId: number;
  @ApiProperty({ example: '1', description: 'Some executor id' })
  @IsInt()
  @Min(1)
  executorId: number;
  @ApiProperty({ example: '1', description: 'Some status id' })
  @IsInt()
  @Min(1)
  statusId: number;
  @ApiProperty({ example: '1', description: 'Some project id' })
  @IsInt()
  @Min(1)
  projectId: number;
}
