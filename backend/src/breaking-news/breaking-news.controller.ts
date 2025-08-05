import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BreakingNewsService } from './breaking-news.service';
import { CreateBreakingNewsDto } from './dto/create-breaking-news.dto';
import { UpdateBreakingNewsDto } from './dto/update-breaking-news.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Breaking News')
@Controller('breaking-news')
export class BreakingNewsController {
  constructor(private readonly breakingNewsService: BreakingNewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create breaking news (Admin only)' })
  create(@Body() createBreakingNewsDto: CreateBreakingNewsDto) {
    return this.breakingNewsService.create(createBreakingNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all breaking news' })
  findAll() {
    return this.breakingNewsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active breaking news' })
  findActive() {
    return this.breakingNewsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get breaking news by ID' })
  findOne(@Param('id') id: string) {
    return this.breakingNewsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update breaking news (Admin only)' })
  update(@Param('id') id: string, @Body() updateBreakingNewsDto: UpdateBreakingNewsDto) {
    return this.breakingNewsService.update(id, updateBreakingNewsDto);
  }

  @Patch(':id/toggle')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle breaking news status (Admin only)' })
  toggleStatus(@Param('id') id: string) {
    return this.breakingNewsService.toggleStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete breaking news (Admin only)' })
  remove(@Param('id') id: string) {
    return this.breakingNewsService.remove(id);
  }
} 