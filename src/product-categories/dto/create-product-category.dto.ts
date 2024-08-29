import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({
    description: 'Name of the product category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the product category',
    example: 'Household electronics',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
