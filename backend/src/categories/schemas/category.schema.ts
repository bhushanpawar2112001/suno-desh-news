import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  nameHindi: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop()
  descriptionHindi?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  articleCount: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category); 