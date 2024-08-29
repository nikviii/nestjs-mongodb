import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProductCategory } from 'src/product-categories/entities/product-category.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  imageUrl: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true,
  })
  productCategory: ProductCategory;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
