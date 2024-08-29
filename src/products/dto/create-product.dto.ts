import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'Powerful laptop with high-end specs',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Image of the product',
    example: 'https://google.com/img.png',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 12.5,
  })
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Product Category', example: 'Electronics' })
  @IsNotEmpty()
  productCategory: ProductCategory;
}
