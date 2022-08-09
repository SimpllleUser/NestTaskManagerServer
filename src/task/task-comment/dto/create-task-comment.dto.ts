import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateTaskCommentDto {
  @ApiProperty({ example: 'body', description: 'Some text' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 1000, { message: 'Не меньше 1' })
  readonly body: string;
  @ApiProperty({ example: '1', description: 'Some task id' })
  @IsInt()
  @Min(1)
  @IsPositive()
  readonly taskId: number;
  @ApiProperty({ example: '1', description: 'Some author id' })
  @IsInt()
  @Min(1)
  @IsPositive()
  readonly authorId: number;
}
