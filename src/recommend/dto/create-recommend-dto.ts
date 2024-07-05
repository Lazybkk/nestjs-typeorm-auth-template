import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecommendDto {
  @ApiProperty()
  @IsString()
  readonly mealType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly calories: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: number;
}

export class DefaultColumnsResponse extends CreateRecommendDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
