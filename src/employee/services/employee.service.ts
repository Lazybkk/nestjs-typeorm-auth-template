import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Dependent } from '../entities/dependent.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private dependentRepository: Repository<Dependent>,
  ) {}

  async findOne(id: number): Promise<Employee> {
    return await this.employeeRepository.findOneOrFail({ id });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.employeeRepository.delete(id);
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);
      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create employee');
    }
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return await this.employeeRepository.findOne({ id });
  }

  async addDependentToEmployee(
    employeeId: number,
    dependentData: Partial<Dependent>,
  ): Promise<Dependent> {
    const employee = await this.employeeRepository.findOne(employeeId, {
      relations: ['dependents'],
    }); // Fetch employee with dependents

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const dependent = this.dependentRepository.create({
      ...dependentData,
      employee,
    });
    return this.dependentRepository.save(dependent);
  }

  async findWithPagination(
    page: number,
    limit: number,
    department?: string,
  ): Promise<[Employee[], number]> {
    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.dependents', 'dependents')
      .leftJoinAndSelect('employee.spouse', 'spouse');

    if (department) {
      queryBuilder.andWhere('employee.employmentDetails LIKE :department', {
        department: `%${department}%`,
      });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }
}
