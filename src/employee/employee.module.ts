import { Module } from '@nestjs/common';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './services/employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
