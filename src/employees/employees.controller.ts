import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  Ip,
} from '@nestjs/common';
import { EmployeesService, Role } from './employees.service';
import { Prisma } from '@prisma/client';
// import { log } from 'console';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body(ValidationPipe) newEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(newEmployee);
  }

  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    console.log(`Request for ALL employees from \t${ip}`);
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
