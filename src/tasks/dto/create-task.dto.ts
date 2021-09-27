import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1000, { message: 'Не меньше 1' })
  title: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 1000, { message: 'Не меньше 4 и не больше 1000' })
  description: string;
  @IsInt()
  @Min(1)
  authorId: number;
  @IsInt()
  @Min(1)
  @IsPositive()
  typeId: number;
  @IsInt()
  @Min(1)
  @IsPositive()
  priorityId: number;
  @IsInt()
  @Min(1)
  executorId: number;
}
