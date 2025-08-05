import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Technology' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'technology' })
  @IsString()
  slug: string;

  @ApiProperty({ required: false, example: 'Technology related news and updates' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 