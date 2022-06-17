import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'email' })
  @IsString({ message: 'Must be striing' })
  @IsEmail({}, { message: 'Not correct  email' })
  readonly login: string;
  @ApiProperty({ example: 'Some name', description: 'user name' })
  @IsString({ message: 'Must be string' })
  readonly name: string;
  @ApiProperty({ example: '12345', description: 'password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Min length 4 and max length 16' })
  readonly password: string;
}
