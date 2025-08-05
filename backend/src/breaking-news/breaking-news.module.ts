import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreakingNewsService } from './breaking-news.service';
import { BreakingNewsController } from './breaking-news.controller';
import { BreakingNews, BreakingNewsSchema } from './breaking-news.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BreakingNews.name, schema: BreakingNewsSchema },
    ]),
  ],
  controllers: [BreakingNewsController],
  providers: [BreakingNewsService],
  exports: [BreakingNewsService],
})
export class BreakingNewsModule {} 