import { Injectable } from '@nestjs/common';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
  ListProductCategoryDto,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCategory } from './entities/product-category.entity';
import { NotFoundException } from '@nestjs/common';
import { getPaginatedData } from '../common/utils/query-helper';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategory>,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const createdCategory = new this.productCategoryModel(
      createProductCategoryDto,
    );
    return createdCategory.save();
  }

  async findAll(filter: ListProductCategoryDto): Promise<{
    items: ProductCategory[];
    total: number;
  }> {
    filter.searchFields = ['name', 'description'];
    return await getPaginatedData(this.productCategoryModel, filter);
  }

  async findOne(id: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoryModel
      .findById(id)
      .populate('products')
      .exec();
    if (!productCategory) {
      throw new NotFoundException(`ProductCategory with ID ${id} not found`);
    }
    return productCategory;
  }

  async update(
    id: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const updatedProductCategory = await this.productCategoryModel
      .findByIdAndUpdate(id, updateProductCategoryDto, { new: true })
      .populate('products')
      .exec();
    if (!updatedProductCategory) {
      throw new NotFoundException(`ProductCategory with ID ${id} not found`);
    }
    return updatedProductCategory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productCategoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`ProductCategory with ID ${id} not found`);
    }
  }
}
