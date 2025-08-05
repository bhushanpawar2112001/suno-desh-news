import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BreakingNewsDocument = BreakingNews & Document;

@Schema({ timestamps: true })
export class BreakingNews {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  titleHindi: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  contentHindi: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 1 })
  priority: number;
}

export const BreakingNewsSchema = SchemaFactory.createForClass(BreakingNews); 