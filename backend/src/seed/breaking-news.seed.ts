import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BreakingNews, BreakingNewsDocument } from '../breaking-news/breaking-news.schema';

@Injectable()
export class BreakingNewsSeedService {
  constructor(
    @InjectModel(BreakingNews.name) private breakingNewsModel: Model<BreakingNewsDocument>,
  ) {}

  async seed() {
    const existingBreakingNews = await this.breakingNewsModel.countDocuments();
    
    if (existingBreakingNews > 0) {
      console.log('Breaking news already seeded, skipping...');
      return;
    }

    const sampleBreakingNews = [
      {
        title: 'Major developments in technology sector as AI breakthrough announced',
        titleHindi: 'प्रौद्योगिकी क्षेत्र में बड़े विकास के रूप में एआई सफलता की घोषणा',
        content: 'New AI breakthrough announced in technology sector • New sports records broken • Entertainment industry updates',
        contentHindi: 'प्रौद्योगिकी क्षेत्र में नई एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट',
        isActive: true,
        priority: 1
      },
      {
        title: 'Breaking: Major sports records broken in championship finals',
        titleHindi: 'तोड़ने वाली खबर: चैम्पियनशिप फाइनल में बड़े खेल रिकॉर्ड टूटे',
        content: 'New sports records broken in championship finals • Technology sector updates • Business news highlights',
        contentHindi: 'चैम्पियनशिप फाइनल में नए खेल रिकॉर्ड टूटे • प्रौद्योगिकी क्षेत्र अपडेट • व्यापार समाचार के मुख्य आकर्षण',
        isActive: true,
        priority: 2
      },
      {
        title: 'Entertainment industry updates and celebrity news',
        titleHindi: 'मनोरंजन उद्योग अपडेट और सेलिब्रिटी समाचार',
        content: 'Entertainment industry updates • Technology breakthroughs • Sports highlights',
        contentHindi: 'मनोरंजन उद्योग अपडेट • प्रौद्योगिकी सफलताएं • खेल के मुख्य आकर्षण',
        isActive: false,
        priority: 3
      }
    ];

    try {
      await this.breakingNewsModel.insertMany(sampleBreakingNews);
      console.log('✅ Breaking news seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding breaking news:', error);
    }
  }
} 