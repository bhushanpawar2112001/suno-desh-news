import { IsString, IsOptional, IsArray, IsEnum, IsBoolean, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from '../schemas/article.schema';

export class CreateArticleDto {
  @ApiProperty({ example: 'Breaking News: Major Discovery' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'breaking-news-major-discovery' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'This is the full content of the article...' })
  @IsString()
  content: string;

  @ApiProperty({ required: false, example: 'A brief summary of the article' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ required: false, example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  featuredImage?: string;

  @ApiProperty({ required: false, example: ['news', 'technology'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  category: string;

  @ApiProperty({ enum: ArticleStatus, default: ArticleStatus.DRAFT })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
} 