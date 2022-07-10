import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'title', description: 'Some title' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  readonly value: string;
  @ApiProperty({ example: '1', description: 'Some user id' })
  @IsInt()
  @Min(1)
  @IsPositive()
  readonly userId: number;
}
