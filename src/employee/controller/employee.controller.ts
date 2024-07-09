import { EmployeeImportService } from './../services/employee-import.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';

@ApiTags('users') // put the name of the controller in swagger
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeeImportService: EmployeeImportService,
  ) {}

  @ApiOperation({ summary: 'Create Employee' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    type: CreateEmployeeDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(createEmployeeDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: Employee,
  })
  @ApiBearerAuth('access-token')
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('department') department?: string,
  ): Promise<{ data: Employee[]; total: number }> {
    const [employees, total] = await this.employeeService.findWithPagination(
      page,
      limit,
      department,
    );
    return {
      data: employees,
      total,
    };
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    type: Employee,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeService.remove(id);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async importEmployees(@UploadedFile() file: Express.Multer.File) {
    await this.employeeImportService.enqueueImportJob(file);
    return { message: 'Employee import job enqueued' };
  }
}
