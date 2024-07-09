import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsEnum(['Male', 'Female', 'Other'])
  gender: 'Male' | 'Female' | 'Other';

  @IsNotEmpty()
  jobTitle: string;

  @IsNotEmpty()
  department: string;

  @IsDateString()
  startDate: Date;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  salary: number;

  @IsOptional() // Status is optional on creation, defaults to 'Active' in the entity
  @IsEnum(['Active', 'Terminated', 'OnLeave'])
  status?: 'Active' | 'Terminated' | 'OnLeave';
}
