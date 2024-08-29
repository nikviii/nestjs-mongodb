// products/dto/product-filter.dto.ts
import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  Max,
  Min,
  IsArray,
  IsObject,
} from 'class-validator';

export class BaseListFilterDto {
  @IsInt()
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Max(250)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  search?: string;

  @IsArray({ each: true })
  @IsOptional()
  searchFields?: string[];

  @IsObject()
  @IsOptional()
  filter?: object;
}
