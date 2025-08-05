import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Category, CategoryDocument } from '../categories/schemas/category.schema';
import { Article, ArticleDocument } from '../articles/schemas/article.schema';
import { BreakingNews, BreakingNewsDocument } from '../breaking-news/breaking-news.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(BreakingNews.name) private breakingNewsModel: Model<BreakingNewsDocument>,
  ) {}

  async seedData() {
    try {
      console.log('🌱 Starting database seeding...');

      // Clear existing data
      await this.userModel.deleteMany({});
      await this.categoryModel.deleteMany({});
      await this.articleModel.deleteMany({});
      await this.breakingNewsModel.deleteMany({});

      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = await this.userModel.create({
        email: 'admin@sunodesh.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
      });

      // Create editor user
      const editorUser = await this.userModel.create({
        email: 'editor@sunodesh.com',
        password: hashedPassword,
        firstName: 'Editor',
        lastName: 'User',
        role: 'editor',
        isActive: true,
      });

      // Create categories
      const categories = await this.categoryModel.create([
        {
          name: 'Politics',
          nameHindi: 'राजनीति',
          slug: 'politics',
          description: 'Latest political news and updates',
          descriptionHindi: 'नवीनतम राजनीतिक समाचार और अपडेट',
          isActive: true,
          rank: 1,
        },
        {
          name: 'Technology',
          nameHindi: 'प्रौद्योगिकी',
          slug: 'technology',
          description: 'Technology news and innovations',
          descriptionHindi: 'प्रौद्योगिकी समाचार और नवाचार',
          isActive: true,
          rank: 2,
        },
        {
          name: 'Business',
          nameHindi: 'व्यापार',
          slug: 'business',
          description: 'Business and economic news',
          descriptionHindi: 'व्यापार और आर्थिक समाचार',
          isActive: true,
          rank: 3,
        },
        {
          name: 'Sports',
          nameHindi: 'खेल',
          slug: 'sports',
          description: 'Sports news and updates',
          descriptionHindi: 'खेल समाचार और अपडेट',
          isActive: true,
          rank: 4,
        },
        {
          name: 'Entertainment',
          nameHindi: 'मनोरंजन',
          slug: 'entertainment',
          description: 'Entertainment and celebrity news',
          descriptionHindi: 'मनोरंजन और सेलिब्रिटी समाचार',
          isActive: true,
          rank: 5,
        },
        {
          name: 'Health',
          nameHindi: 'स्वास्थ्य',
          slug: 'health',
          description: 'Health and medical news',
          descriptionHindi: 'स्वास्थ्य और चिकित्सा समाचार',
          isActive: true,
          rank: 6,
        },
      ]);

             // Create articles
       const articles = [
         // Politics Articles
         {
           title: 'Major Political Reform Announced by Government',
           titleHindi: 'सरकार द्वारा बड़े राजनीतिक सुधार की घोषणा',
           slug: 'major-political-reform-announced',
           content: 'The government has announced a comprehensive political reform package that aims to improve transparency and accountability in governance. The new measures include stricter regulations for political funding and enhanced public participation in decision-making processes.',
           contentHindi: 'सरकार ने एक व्यापक राजनीतिक सुधार पैकेज की घोषणा की है जो शासन में पारदर्शिता और जवाबदेही में सुधार लाने का लक्ष्य रखता है। नए उपायों में राजनीतिक फंडिंग के लिए सख्त नियम और निर्णय लेने की प्रक्रियाओं में बढ़ी हुई जन भागीदारी शामिल है।',
           excerpt: 'Comprehensive political reform package announced to improve governance transparency.',
           excerptHindi: 'शासन पारदर्शिता में सुधार के लिए व्यापक राजनीतिक सुधार पैकेज की घोषणा।',
           featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
           category: categories[0]._id,
           author: adminUser._id,
           status: 'published',
           isFeatured: true,
           isActive: true,
           tags: ['politics', 'reform', 'government'],
           viewCount: 1250,
           likeCount: 89,
         },
                 {
           title: 'Opposition Parties Unite for Common Cause',
           titleHindi: 'विपक्षी दल साझा मुद्दे के लिए एकजुट',
           slug: 'opposition-parties-unite',
           content: 'In a historic move, major opposition parties have come together to address common concerns about electoral reforms and democratic processes. This unprecedented unity signals a new era in Indian politics.',
           contentHindi: 'एक ऐतिहासिक कदम में, प्रमुख विपक्षी दल चुनावी सुधारों और लोकतांत्रिक प्रक्रियाओं के बारे में साझा चिंताओं को संबोधित करने के लिए एक साथ आए हैं। यह अभूतपूर्व एकता भारतीय राजनीति में एक नए युग का संकेत देती है।',
           excerpt: 'Historic unity among opposition parties for electoral reforms.',
           excerptHindi: 'चुनावी सुधारों के लिए विपक्षी दलों के बीच ऐतिहासिक एकता।',
           featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
           category: categories[0]._id,
           author: editorUser._id,
           status: 'published',
           isFeatured: false,
           isActive: true,
           tags: ['opposition', 'unity', 'democracy'],
           viewCount: 890,
           likeCount: 67,
         },

                 // Technology Articles
         {
           title: 'AI Breakthrough in Healthcare: Revolutionary Technology',
           titleHindi: 'स्वास्थ्य सेवा में एआई सफलता: क्रांतिकारी प्रौद्योगिकी',
           slug: 'ai-breakthrough-healthcare',
           content: 'Researchers have developed a new artificial intelligence system that can diagnose diseases with unprecedented accuracy. This breakthrough technology, trained on millions of medical records, achieves 95% accuracy in diagnosing various conditions including cancer, heart disease, and neurological disorders.',
           contentHindi: 'शोधकर्ताओं ने एक नई कृत्रिम बुद्धिमत्ता प्रणाली विकसित की है जो बेजोड़ सटीकता के साथ बीमारियों का निदान कर सकती है। यह सफलता प्रौद्योगिकी, लाखों चिकित्सा रिकॉर्ड पर प्रशिक्षित, कैंसर, हृदय रोग और न्यूरोलॉजिकल विकारों सहित विभिन्न स्थितियों के निदान में 95% सटीकता प्राप्त करती है।',
           excerpt: 'New AI system achieves 95% accuracy in disease diagnosis.',
           excerptHindi: 'नई एआई प्रणाली बीमारी के निदान में 95% सटीकता प्राप्त करती है।',
           featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
           category: categories[1]._id,
           author: adminUser._id,
           status: 'published',
           isFeatured: true,
           isActive: true,
           tags: ['AI', 'healthcare', 'diagnosis'],
           viewCount: 2100,
           likeCount: 156,
         },
                 {
           title: 'Quantum Computing Milestone Achieved',
           titleHindi: 'क्वांटम कंप्यूटिंग मील का पत्थर हासिल',
           slug: 'quantum-computing-milestone',
           content: 'Scientists have achieved a major breakthrough in quantum computing, successfully creating a stable quantum processor with 1000 qubits. This development brings us closer to practical quantum computing applications.',
           contentHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी सफलता हासिल की है, 1000 क्विबिट्स के साथ सफलतापूर्वक एक स्थिर क्वांटम प्रोसेसर बनाया है। यह विकास हमें व्यावहारिक क्वांटम कंप्यूटिंग अनुप्रयोगों के करीब लाता है।',
           excerpt: 'Scientists create stable quantum processor with 1000 qubits.',
           excerptHindi: 'वैज्ञानिकों ने 1000 क्विबिट्स के साथ स्थिर क्वांटम प्रोसेसर बनाया।',
           featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
           category: categories[1]._id,
           author: editorUser._id,
           status: 'published',
           isFeatured: false,
           isActive: true,
           tags: ['quantum', 'computing', 'technology'],
           viewCount: 1450,
           likeCount: 98,
         },

         // Business Articles
         {
           title: 'Stock Market Reaches New Heights',
           titleHindi: 'शेयर बाजार नई ऊंचाई तक पहुंचा',
           slug: 'stock-market-new-heights',
           content: 'The Indian stock market has reached unprecedented levels, with major indices showing strong performance. Analysts attribute this growth to positive economic indicators and strong corporate earnings.',
           contentHindi: 'भारतीय शेयर बाजार अभूतपूर्व स्तर तक पहुंच गया है, प्रमुख सूचकांक मजबूत प्रदर्शन दिखा रहे हैं। विश्लेषक इस विकास को सकारात्मक आर्थिक संकेतकों और मजबूत कॉर्पोरेट आय के लिए जिम्मेदार ठहराते हैं।',
           excerpt: 'Indian stock market reaches unprecedented levels with strong performance.',
           excerptHindi: 'भारतीय शेयर बाजार मजबूत प्रदर्शन के साथ अभूतपूर्व स्तर तक पहुंचा।',
           featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
           category: categories[2]._id,
           author: adminUser._id,
           status: 'published',
           isFeatured: true,
           isActive: true,
           tags: ['stock market', 'economy', 'business'],
           viewCount: 1800,
           likeCount: 134,
         },

         // Sports Articles
         {
           title: 'Cricket Team Wins Championship Title',
           titleHindi: 'क्रिकेट टीम ने चैम्पियनशिप खिताब जीता',
           slug: 'cricket-team-championship',
           content: 'The national cricket team has secured a historic victory in the international championship, defeating the defending champions in a thrilling final match. The victory marks a significant achievement for Indian cricket.',
           contentHindi: 'राष्ट्रीय क्रिकेट टीम ने अंतरराष्ट्रीय चैम्पियनशिप में एक ऐतिहासिक जीत हासिल की है, रोमांचक फाइनल मैच में पिछले चैम्पियन को हराया। यह जीत भारतीय क्रिकेट के लिए एक महत्वपूर्ण उपलब्धि का प्रतीक है।',
           excerpt: 'Historic victory for national cricket team in international championship.',
           excerptHindi: 'अंतरराष्ट्रीय चैम्पियनशिप में राष्ट्रीय क्रिकेट टीम की ऐतिहासिक जीत।',
           featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop',
           category: categories[3]._id,
           author: editorUser._id,
           status: 'published',
           isFeatured: true,
           isActive: true,
           tags: ['cricket', 'championship', 'victory'],
           viewCount: 3200,
           likeCount: 245,
         },

         // Entertainment Articles
         {
           title: 'Bollywood Stars Shine at Award Ceremony',
           titleHindi: 'पुरस्कार समारोह में बॉलीवुड सितारों की चमक',
           slug: 'bollywood-awards-ceremony',
           content: 'The annual Bollywood awards ceremony was a star-studded event with top actors and filmmakers receiving recognition for their outstanding contributions to Indian cinema. The event celebrated the best of Indian entertainment.',
           contentHindi: 'वार्षिक बॉलीवुड पुरस्कार समारोह एक स्टार-स्टडेड कार्यक्रम था जिसमें शीर्ष अभिनेताओं और फिल्मकारों को भारतीय सिनेमा में उनके उत्कृष्ट योगदान के लिए मान्यता मिली। इस कार्यक्रम ने भारतीय मनोरंजन के सर्वश्रेष्ठ का जश्न मनाया।',
           excerpt: 'Star-studded Bollywood awards ceremony celebrates Indian cinema.',
           excerptHindi: 'स्टार-स्टडेड बॉलीवुड पुरस्कार समारोह ने भारतीय सिनेमा का जश्न मनाया।',
           featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
           category: categories[4]._id,
           author: adminUser._id,
           status: 'published',
           isFeatured: false,
           isActive: true,
           tags: ['bollywood', 'awards', 'entertainment'],
           viewCount: 1650,
           likeCount: 112,
         },

         // Health Articles
         {
           title: 'New Medical Discovery for Chronic Diseases',
           titleHindi: 'पुरानी बीमारियों के लिए नई चिकित्सा खोज',
           slug: 'medical-discovery-chronic-diseases',
           content: 'Medical researchers have discovered a breakthrough treatment for chronic diseases that affects millions of people worldwide. The new therapy shows promising results in clinical trials and offers hope for better patient outcomes.',
           contentHindi: 'चिकित्सा शोधकर्ताओं ने पुरानी बीमारियों के लिए एक सफलता उपचार की खोज की है जो दुनिया भर में लाखों लोगों को प्रभावित करती है। नई थेरेपी नैदानिक परीक्षणों में आशाजनक परिणाम दिखाती है और बेहतर रोगी परिणामों के लिए आशा प्रदान करती है।',
           excerpt: 'Breakthrough treatment discovered for chronic diseases affecting millions.',
           excerptHindi: 'लाखों लोगों को प्रभावित करने वाली पुरानी बीमारियों के लिए सफलता उपचार की खोज।',
           featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
           category: categories[5]._id,
           author: editorUser._id,
           status: 'published',
           isFeatured: false,
           isActive: true,
           tags: ['medical', 'treatment', 'health'],
           viewCount: 980,
           likeCount: 76,
         },
      ];

      await this.articleModel.create(articles);

      // Create breaking news
      const breakingNews = [
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

      await this.breakingNewsModel.create(breakingNews);

      // Update category article counts
      for (const category of categories) {
        const articleCount = await this.articleModel.countDocuments({ category: category._id });
        await this.categoryModel.findByIdAndUpdate(category._id, { articleCount });
      }

      console.log('✅ Database seeding completed successfully!');
      console.log(`📊 Created: ${categories.length} categories, ${articles.length} articles, ${breakingNews.length} breaking news, 2 users`);
      
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }
} 