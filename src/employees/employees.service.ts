import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  create(createEmployeeDto: object) {
    return createEmployeeDto;
  }

  findAll() {
    return {};
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateEmployeeDto: object) {
    return { id, ...updateEmployeeDto };
  }

  remove(id: number) {
    return { id };
  }
}
