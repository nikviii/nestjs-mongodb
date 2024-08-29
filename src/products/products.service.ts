import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, ListProductDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { getPaginatedData } from '../common/utils/query-helper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(filter: ListProductDto): Promise<{
    items: Product[];
    total: number;
  }> {
    if (filter.search) filter.searchFields = ['name', 'description'];
    if (filter.productCategory)
      filter.filter = {
        productCategory: new mongoose.Types.ObjectId(filter.productCategory),
      };
    return await getPaginatedData(this.productModel, filter);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('productCategory')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .populate('productCategory')
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
