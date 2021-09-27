import { IsNumberString, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  title: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 1000, { message: 'Не меньше 4 и не больше 1000' })
  description: string;
  @IsNumberString()
  authorId: number;
  typeId: number;
  priorityId: number;
  executorId: number;
}
