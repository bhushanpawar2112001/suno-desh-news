import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateBreakingNewsDto {
  @ApiProperty({ example: 'Major Technology Breakthrough' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'प्रमुख तकनीक सफलता' })
  @IsString()
  titleHindi: string;

  @ApiProperty({ example: 'New AI breakthrough announced in technology sector • New sports records broken • Entertainment industry updates' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'प्रौद्योगिकी क्षेत्र में नई एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट' })
  @IsString()
  contentHindi: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  priority?: number;
} 