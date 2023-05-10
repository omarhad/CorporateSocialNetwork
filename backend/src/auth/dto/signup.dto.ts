import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthdate?: string;

  @IsString()
  position?: string;

  @IsString()
  location?: string;

  isAdmin?: boolean;
}
