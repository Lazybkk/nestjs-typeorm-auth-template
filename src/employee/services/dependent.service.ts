import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dependent } from '../entities/dependent.entity';
import { Employee } from '../entities/employee.entity';
import { CreateDependentDto } from '../dto/create-dependent.dto';
import { UpdateDependentDto } from '../dto/update-dependent.dto';

@Injectable()
export class DependentsService {
  constructor(
    @InjectRepository(Dependent)
    private dependentRepository: Repository<Dependent>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>, // Inject the Employee repository
  ) {}

  async findAllByEmployeeId(employeeId: number): Promise<Dependent[]> {
    const employee = await this.employeeRepository.findOne({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return this.dependentRepository.find({ where: { employee } });
  }

  async create(
    employeeId: number,
    createDependentDto: CreateDependentDto,
  ): Promise<Dependent> {
    const employee = await this.employeeRepository.findOne({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const dependent = this.dependentRepository.create({
      ...createDependentDto,
      employee,
    });
    return this.dependentRepository.save(dependent);
  }

  async findOne(id: number): Promise<Dependent> {
    const dependent = await this.dependentRepository.findOne({ id });
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${id} not found`);
    }
    return dependent;
  }

  async update(
    id: number,
    updateDependentDto: UpdateDependentDto,
  ): Promise<Dependent> {
    const dependent = await this.dependentRepository.findOne({ id });
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${id} not found`);
    }

    Object.assign(dependent, updateDependentDto);
    return this.dependentRepository.save(dependent);
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.dependentRepository.delete(id);
  }
}
