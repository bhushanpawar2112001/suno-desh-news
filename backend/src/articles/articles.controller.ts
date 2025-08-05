import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  create(@Body() createArticleDto: CreateArticleDto) {
    // TODO: Get author ID from JWT token
    const authorId = '507f1f77bcf86cd799439011'; // Temporary
    return this.articlesService.create(createArticleDto, authorId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured articles' })
  getFeatured() {
    return this.articlesService.getFeaturedArticles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get article by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update article' })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment article view count' })
  incrementView(@Param('id') id: string) {
    return this.articlesService.incrementViewCount(id);
  }
} 