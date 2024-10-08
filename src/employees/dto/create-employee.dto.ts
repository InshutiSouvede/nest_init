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
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsEnum(['INTERN', 'FULLTIME', 'PARTTIME'])
  role: Role;
}
