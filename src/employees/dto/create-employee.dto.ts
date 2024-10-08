import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Role } from '../employees.service';

export class CreateEmployeeDto {
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsPositive({ message: 'Age must be a positive number' })
  age: number;

  @IsEnum(['INTERN', 'FULLTIME', 'PARTTIME'], {
    message:
      "role must be one of the following values:'INTERN', 'FULLTIME', 'PARTTIME'",
  })
  role: Role;
}
