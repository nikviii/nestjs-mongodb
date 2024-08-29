import { IsOptional, IsString } from 'class-validator';
import { BaseListFilterDto } from '../../common/dto/base-list-filter.dto';

export class ListProductDto extends BaseListFilterDto {
  @IsString()
  @IsOptional()
  productCategory?: string;
}
