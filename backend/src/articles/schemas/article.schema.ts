import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Category } from '../../categories/schemas/category.schema';

export type ArticleDocument = Article & Document;

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  titleHindi: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  contentHindi: string;

  @Prop()
  excerpt?: string;

  @Prop()
  excerptHindi?: string;

  @Prop()
  featuredImage?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  publishedAt?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article); 