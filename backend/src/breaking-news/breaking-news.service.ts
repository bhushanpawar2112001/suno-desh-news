import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BreakingNews, BreakingNewsDocument } from './breaking-news.schema';
import { CreateBreakingNewsDto } from './dto/create-breaking-news.dto';
import { UpdateBreakingNewsDto } from './dto/update-breaking-news.dto';

@Injectable()
export class BreakingNewsService {
  constructor(
    @InjectModel(BreakingNews.name) private breakingNewsModel: Model<BreakingNewsDocument>,
  ) {}

  async create(createBreakingNewsDto: CreateBreakingNewsDto): Promise<BreakingNews> {
    const createdBreakingNews = new this.breakingNewsModel(createBreakingNewsDto);
    return createdBreakingNews.save();
  }

  async findAll(): Promise<BreakingNews[]> {
    return this.breakingNewsModel.find().sort({ priority: 1, createdAt: -1 }).exec();
  }

  async findActive(): Promise<BreakingNews[]> {
    return this.breakingNewsModel.find({ isActive: true }).sort({ priority: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<BreakingNews> {
    const breakingNews = await this.breakingNewsModel.findById(id).exec();
    if (!breakingNews) {
      throw new NotFoundException('Breaking news not found');
    }
    return breakingNews;
  }

  async update(id: string, updateBreakingNewsDto: UpdateBreakingNewsDto): Promise<BreakingNews> {
    const updatedBreakingNews = await this.breakingNewsModel
      .findByIdAndUpdate(id, updateBreakingNewsDto, { new: true })
      .exec();
    
    if (!updatedBreakingNews) {
      throw new NotFoundException('Breaking news not found');
    }
    return updatedBreakingNews;
  }

  async toggleStatus(id: string): Promise<BreakingNews> {
    const breakingNews = await this.findOne(id);
    const updatedBreakingNews = await this.breakingNewsModel
      .findByIdAndUpdate(id, { isActive: !breakingNews.isActive }, { new: true })
      .exec();
    
    if (!updatedBreakingNews) {
      throw new NotFoundException('Breaking news not found');
    }
    return updatedBreakingNews;
  }

  async remove(id: string): Promise<void> {
    const result = await this.breakingNewsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Breaking news not found');
    }
  }
} 