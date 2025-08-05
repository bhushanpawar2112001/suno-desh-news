import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto, authorId: string): Promise<Article> {
    const createdArticle = new this.articleModel({
      ...createArticleDto,
      author: authorId,
    });
    return createdArticle.save();
  }

  async findAll(query: any = {}): Promise<Article[]> {
    const filter: any = { isActive: true };
    
    if (query.status) {
      filter.status = query.status;
    }
    if (query.category) {
      filter.category = query.category;
    }
    if (query.isFeatured) {
      filter.isFeatured = query.isFeatured === 'true';
    }

    return this.articleModel
      .find(filter)
      .populate('author', 'firstName lastName')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel
      .findById(id)
      .populate('author', 'firstName lastName')
      .populate('category', 'name slug')
      .exec();
    
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleModel
      .findOne({ slug, isActive: true })
      .populate('author', 'firstName lastName')
      .populate('category', 'name slug')
      .exec();
    
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const updatedArticle = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .populate('author', 'firstName lastName')
      .populate('category', 'name slug')
      .exec();
    
    if (!updatedArticle) {
      throw new NotFoundException('Article not found');
    }
    return updatedArticle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.articleModel.findByIdAndUpdate(id, { isActive: false }).exec();
    if (!result) {
      throw new NotFoundException('Article not found');
    }
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }).exec();
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return this.articleModel
      .find({ isFeatured: true, isActive: true, status: 'published' })
      .populate('author', 'firstName lastName')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();
  }
} 