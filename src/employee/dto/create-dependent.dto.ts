import { IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class CreateDependentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: Date; // Assuming ISO 8601 date format

  @IsEnum(['Spouse', 'Child', 'Parent', 'Other'])
  relationship: 'Spouse' | 'Child' | 'Parent' | 'Other';
}
