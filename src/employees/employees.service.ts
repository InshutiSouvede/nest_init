import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuidv4 } from 'uuid';
export enum Role {
  INTERN = 'INTERN',
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}
const employees: CreateEmployeeDto[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'doexample.com',
    age: 20,
    role: Role.FULLTIME,
  },
  {
    id: uuidv4(),
    name: 'James',
    email: 'james@example.com',
    age: 20,
    role: Role.PARTTIME,
  },
  {
    id: uuidv4(),
    name: 'Amos',
    email: 'Amos@example.com',
    age: 20,
    role: Role.INTERN,
  },
  {
    id: uuidv4(),
    name: 'Dan',
    email: 'dan@example.com',
    age: 20,
    role: Role.FULLTIME,
  },
];

@Injectable()
export class EmployeesService {
  create(employee: CreateEmployeeDto) {
    const newEmployee = {
      id: uuidv4(),
      ...employee,
    };
    employees.push(newEmployee);
    return newEmployee;
  }

  findAll(role?: Role) {
    if (role) {
      return employees.filter((employee) => employee.role === role);
    }
    return employees;
  }

  findOne(id: string) {
    const employee = employees.find((employee) => employee.id === id);
    if (employee) return employee;
    throw new NotFoundException('Employee not found');
  }

  update(id: string, newInfomation: UpdateEmployeeDto) {
    let updatedEmployee: CreateEmployeeDto | null = null;
    employees.forEach((employee, index) => {
      if (employee.id == id) {
        updatedEmployee = { ...employee, ...newInfomation };
        employees.splice(index, 1, updatedEmployee);
      }
    });
    if (updatedEmployee) {
      return updatedEmployee;
    }
    throw new NotFoundException('Employee not found');
  }

  remove(id: string) {
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex !== -1) return employees.splice(employeeIndex, 1);
    throw new NotFoundException('Employee not found');
  }
}
