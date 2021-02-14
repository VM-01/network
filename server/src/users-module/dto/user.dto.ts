/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  id?: number
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  surname: string;
  @IsEmail()
  login: string;
  @MinLength(6)
  password: string;
  token?: string;
  verified?: string;
}