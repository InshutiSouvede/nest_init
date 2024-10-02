import { Injectable, NotFoundException } from '@nestjs/common';
export interface CreateEmployeeDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}
export interface UpdateEmployeeDto {
  name?: string;
  email?: string;
  role?: Role;
}
export enum Role {
  INTERN = 'INTERN',
  FREELANCER = 'FREELANCER',
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}
const employees: CreateEmployeeDto[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'pF0lO@example.com',
    role: Role.FREELANCER,
  },
];

@Injectable()
export class EmployeesService {
  create(createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = {
      id: employees.length + 1,
      ...createEmployeeDto,
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

  findOne(id: number) {
    const employee = employees.find((employee) => employee.id === id);
    if (employee) return employee;
    throw new NotFoundException('Employee not found');
  }

  update(id: number, newInfomation: UpdateEmployeeDto) {
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

  remove(id: number) {
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex !== -1) return employees.splice(employeeIndex, 1);
    throw new NotFoundException('Employee not found');
  }
}
