import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { DependentsService } from '../services/dependent.service';
import { Dependent } from '../entities/dependent.entity';
import { CreateDependentDto } from '../dto/create-dependent.dto';
import { UpdateDependentDto } from '../dto/update-dependent.dto';

@Controller('employees/:employeeId/dependents')
export class DependentsController {
  constructor(private dependentsService: DependentsService) {}

  @Get()
  async findAll(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ): Promise<Dependent[]> {
    return this.dependentsService.findAllByEmployeeId(employeeId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() createDependentDto: CreateDependentDto,
  ): Promise<Dependent> {
    return this.dependentsService.create(employeeId, createDependentDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Dependent> {
    const dependent = await this.dependentsService.findOne(id);
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${id} not found`);
    }
    return dependent;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDependentDto: UpdateDependentDto,
  ): Promise<Dependent> {
    const dependent = await this.dependentsService.update(
      id,
      updateDependentDto,
    );
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${id} not found`);
    }
    return dependent;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.dependentsService.remove(id);
    if (!result.affected) {
      throw new NotFoundException(`Dependent with ID ${id} not found`);
    }
  }
}
