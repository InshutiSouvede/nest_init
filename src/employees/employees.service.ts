import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
export enum Role {
  INTERN = 'INTERN',
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseServive: DatabaseService) {}
  async create(employee: Prisma.EmployeeCreateInput) {
    const newEmployee = await this.databaseServive.employee.create({
      data: employee,
    });
    return newEmployee;
  }

  async findAll(role?: Role) {
    if (role) {
      return await this.databaseServive.employee.findMany({ where: { role } });
    }
    return await this.databaseServive.employee.findMany();
  }

  async findOne(id: string) {
    const employee = await this.databaseServive.employee.findUnique({
      where: { id },
    });
    if (employee) return employee;
    throw new NotFoundException('Employee not found');
  }

  async update(id: string, newInfomation: Prisma.EmployeeUpdateInput) {
    const updatedEmployee = await this.databaseServive.employee.update({
      where: { id },
      data: newInfomation,
    });
    if (updatedEmployee) {
      return updatedEmployee;
    }
    throw new NotFoundException('Employee not found');
  }

  async remove(id: string) {
    return await this.databaseServive.employee.delete({ where: { id } });
  }
}
