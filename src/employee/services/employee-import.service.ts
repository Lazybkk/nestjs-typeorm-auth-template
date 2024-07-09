import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Dependent } from '../entities/dependent.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateDependentDto } from '../dto/create-dependent.dto';
import { validate } from 'class-validator';
import * as csv from 'fast-csv';

@Injectable()
export class EmployeeImportService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Dependent)
    private dependentRepository: Repository<Dependent>,
  ) {}

  async importEmployeesFromCsv(file: Express.Multer.File) {
    const employees: CreateEmployeeDto[] = [];
    const dependents: {
      employeeEmail: string;
      dependentData: CreateDependentDto;
    }[] = [];
    const errors: string[] = [];

    await new Promise<void>((resolve, reject) => {
      csv
        .parseString(file.buffer.toString(), { headers: true })
        .on('data', async (row) => {
          // Data Transformation
          const employeeDto: CreateEmployeeDto = {
            firstName: row.employeeFirstName,
            lastName: row.employeeLastName,
            email: row.employeeEmail,
            // ... map other employee fields
          };

          const dependentDto: CreateDependentDto | null = row.dependentFirstName
            ? {
                firstName: row.dependentFirstName,
                lastName: row.dependentLastName,
                // ... map other dependent fields
              }
            : null;

          // Data Validation
          const employeeValidationErrors = await validate(employeeDto);
          if (employeeValidationErrors.length > 0) {
            errors.push(
              `Employee Validation Errors: ${JSON.stringify(
                employeeValidationErrors,
              )}`,
            );
          } else {
            employees.push(employeeDto);

            if (dependentDto) {
              const dependentValidationErrors = await validate(dependentDto);
              if (dependentValidationErrors.length > 0) {
                errors.push(
                  `Dependent Validation Errors: ${JSON.stringify(
                    dependentValidationErrors,
                  )}`,
                );
              } else {
                dependents.push({
                  employeeEmail: row.employeeEmail,
                  dependentData: dependentDto,
                });
              }
            }
          }
        })
        .on('end', () => {
          if (errors.length > 0) {
            reject(new BadRequestException(errors));
          } else {
            resolve();
          }
        });
    });

    // Insert data into the database within a transaction
    const entityManager = getManager();
    await entityManager.transaction(async (transactionalEntityManager) => {
      const savedEmployees = await transactionalEntityManager.save(employees);

      // Link dependents to their respective employees
      for (const { employeeEmail, dependentData } of dependents) {
        const employee = savedEmployees.find((e) => e.email === employeeEmail);
        if (employee) {
          dependentData.employee = employee;
          await transactionalEntityManager.save(dependentData);
        } else {
          errors.push(
            `Employee not found for dependent: ${dependentData.firstName} ${dependentData.lastName}`,
          );
        }
      }
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
