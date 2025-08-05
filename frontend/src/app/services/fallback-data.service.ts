import { Injectable } from '@angular/core';
import { Article, Category, User } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FallbackDataService {

  constructor() {}

  getMockArticles(): Article[] {
    return [
      {
        _id: '1',
        title: 'Breaking News: Major Technology Breakthrough',
        titleHindi: 'तकनीक में बड़ी सफलता',
        slug: 'technology-breakthrough',
        content: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry. This breakthrough could lead to faster computers and more secure communications.',
        contentHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी खोज की है जो उद्योग को बदल सकती है।',
        excerpt: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry...',
        excerptHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी खोज की है...',
        featuredImage: 'https://picsum.photos/800/400?random=1',
        category: this.getMockCategories()[0],
        author: this.getMockUsers()[0],
        status: 'published',
        isFeatured: true,
        isActive: true,
        tags: ['technology', 'quantum computing', 'innovation'],
        viewCount: 1250,
        likeCount: 89,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        _id: '2',
        title: 'Sports Update: Championship Finals',
        titleHindi: 'खेल अपडेट: चैम्पियनशिप फाइनल',
        slug: 'championship-finals',
        content: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected. Teams have been preparing for months for this moment.',
        contentHindi: 'चैम्पियनशिप फाइनल इस सप्ताहांत शुरू होने वाले हैं और रिकॉर्ड व्यूअरशिप की उम्मीद है।',
        excerpt: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected...',
        excerptHindi: 'चैम्पियनशिप फाइनल इस सप्ताहांत शुरू होने वाले हैं...',
        featuredImage: 'https://picsum.photos/800/400?random=2',
        category: this.getMockCategories()[1],
        author: this.getMockUsers()[1],
        status: 'published',
        isFeatured: true,
        isActive: true,
        tags: ['sports', 'championship', 'finals'],
        viewCount: 2100,
        likeCount: 156,
        createdAt: '2024-01-14T15:45:00Z',
        updatedAt: '2024-01-14T15:45:00Z'
      },
      {
        _id: '3',
        title: 'Business News: Market Analysis',
        titleHindi: 'व्यापार समाचार: बाजार विश्लेषण',
        slug: 'market-analysis',
        content: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments. The market is showing strong growth potential.',
        contentHindi: 'वैश्विक बाजार सकारात्मक रुझान दिखा रहे हैं क्योंकि निवेशक उभरती तकनीकों में विश्वास हासिल कर रहे हैं।',
        excerpt: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments...',
        excerptHindi: 'वैश्विक बाजार सकारात्मक रुझान दिखा रहे हैं...',
        featuredImage: 'https://picsum.photos/800/400?random=3',
        category: this.getMockCategories()[2],
        author: this.getMockUsers()[2],
        status: 'published',
        isFeatured: false,
        isActive: true,
        tags: ['business', 'market', 'investment'],
        viewCount: 890,
        likeCount: 67,
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z'
      },
      {
        _id: '4',
        title: 'Health & Wellness: New Research Findings',
        titleHindi: 'स्वास्थ्य और कल्याण: नए शोध निष्कर्ष',
        slug: 'health-research-findings',
        content: 'Recent studies reveal the importance of mental health awareness and its impact on overall well-being. New research shows promising results in mental health treatment.',
        contentHindi: 'हाल के अध्ययन मानसिक स्वास्थ्य जागरूकता के महत्व को प्रकट करते हैं।',
        excerpt: 'Recent studies reveal the importance of mental health awareness and its impact on overall well-being...',
        excerptHindi: 'हाल के अध्ययन मानसिक स्वास्थ्य जागरूकता के महत्व को प्रकट करते हैं...',
        featuredImage: 'https://picsum.photos/800/400?random=4',
        category: this.getMockCategories()[3],
        author: this.getMockUsers()[3],
        status: 'published',
        isFeatured: true,
        isActive: true,
        tags: ['health', 'wellness', 'mental health'],
        viewCount: 1560,
        likeCount: 234,
        createdAt: '2024-01-12T14:20:00Z',
        updatedAt: '2024-01-12T14:20:00Z'
      },
      {
        _id: '5',
        title: 'Entertainment: Award Show Highlights',
        titleHindi: 'मनोरंजन: पुरस्कार समारोह के मुख्य आकर्षण',
        slug: 'award-show-highlights',
        content: 'The annual entertainment awards ceremony celebrated outstanding achievements in film, music, and television. The event was attended by industry leaders and celebrities.',
        contentHindi: 'वार्षिक मनोरंजन पुरस्कार समारोह ने फिल्म, संगीत और टेलीविजन में उत्कृष्ट उपलब्धियों का जश्न मनाया।',
        excerpt: 'The annual entertainment awards ceremony celebrated outstanding achievements in film, music, and television...',
        excerptHindi: 'वार्षिक मनोरंजन पुरस्कार समारोह ने उत्कृष्ट उपलब्धियों का जश्न मनाया...',
        featuredImage: 'https://picsum.photos/800/400?random=5',
        category: this.getMockCategories()[4],
        author: this.getMockUsers()[4],
        status: 'published',
        isFeatured: false,
        isActive: true,
        tags: ['entertainment', 'awards', 'celebrities'],
        viewCount: 3200,
        likeCount: 445,
        createdAt: '2024-01-11T20:00:00Z',
        updatedAt: '2024-01-11T20:00:00Z'
      },
      {
        _id: '6',
        title: 'Science: Space Exploration Update',
        titleHindi: 'विज्ञान: अंतरिक्ष अन्वेषण अपडेट',
        slug: 'space-exploration-update',
        content: 'NASA announces new missions to explore distant planets and search for signs of extraterrestrial life. These missions will push the boundaries of human exploration.',
        contentHindi: 'नासा ने दूर के ग्रहों की खोज और अलौकिक जीवन के संकेतों की खोज के लिए नए मिशन की घोषणा की।',
        excerpt: 'NASA announces new missions to explore distant planets and search for signs of extraterrestrial life...',
        excerptHindi: 'नासा ने दूर के ग्रहों की खोज के लिए नए मिशन की घोषणा की...',
        featuredImage: 'https://picsum.photos/800/400?random=6',
        category: this.getMockCategories()[5],
        author: this.getMockUsers()[5],
        status: 'published',
        isFeatured: true,
        isActive: true,
        tags: ['science', 'space', 'NASA'],
        viewCount: 1890,
        likeCount: 178,
        createdAt: '2024-01-10T11:30:00Z',
        updatedAt: '2024-01-10T11:30:00Z'
      }
    ];
  }

  getMockCategories(): Category[] {
    return [
             {
         _id: '1',
         name: 'Technology',
         nameHindi: 'तकनीक',
         slug: 'technology',
         description: 'Latest tech news, innovations, and digital trends',
         descriptionHindi: 'नवीनतम तकनीक समाचार, नवाचार और डिजिटल रुझान',
         isActive: true,
         articleCount: 15,
         rank: 1,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       },
             {
         _id: '2',
         name: 'Sports',
         nameHindi: 'खेल',
         slug: 'sports',
         description: 'Sports news, match updates, and athlete stories',
         descriptionHindi: 'खेल समाचार, मैच अपडेट और एथलीट की कहानियां',
         isActive: true,
         articleCount: 12,
         rank: 2,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       },
       {
         _id: '3',
         name: 'Business',
         nameHindi: 'व्यापार',
         slug: 'business',
         description: 'Business news, market updates, and financial insights',
         descriptionHindi: 'व्यापार समाचार, बाजार अपडेट और वित्तीय अंतर्दृष्टि',
         isActive: true,
         articleCount: 18,
         rank: 3,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       },
       {
         _id: '4',
         name: 'Health',
         nameHindi: 'स्वास्थ्य',
         slug: 'health',
         description: 'Health news, medical breakthroughs, and wellness tips',
         descriptionHindi: 'स्वास्थ्य समाचार, चिकित्सा सफलताएं और कल्याण युक्तियां',
         isActive: true,
         articleCount: 10,
         rank: 4,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       },
       {
         _id: '5',
         name: 'Entertainment',
         nameHindi: 'मनोरंजन',
         slug: 'entertainment',
         description: 'Entertainment news, celebrity updates, and cultural events',
         descriptionHindi: 'मनोरंजन समाचार, सेलिब्रिटी अपडेट और सांस्कृतिक कार्यक्रम',
         isActive: true,
         articleCount: 14,
         rank: 5,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       },
       {
         _id: '6',
         name: 'Science',
         nameHindi: 'विज्ञान',
         slug: 'science',
         description: 'Scientific discoveries, research updates, and space news',
         descriptionHindi: 'वैज्ञानिक खोजें, शोध अपडेट और अंतरिक्ष समाचार',
         isActive: true,
         articleCount: 8,
         rank: 6,
         createdAt: '2024-01-01T00:00:00Z',
         updatedAt: '2024-01-01T00:00:00Z'
       }
    ];
  }

  getMockUsers(): User[] {
    return [
      {
        _id: '1',
        email: 'john.smith@newshub.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '2',
        email: 'sarah.johnson@newshub.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '3',
        email: 'mike.chen@newshub.com',
        firstName: 'Mike',
        lastName: 'Chen',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '4',
        email: 'emily.brown@newshub.com',
        firstName: 'Emily',
        lastName: 'Brown',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '5',
        email: 'lisa.wang@newshub.com',
        firstName: 'Lisa',
        lastName: 'Wang',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '6',
        email: 'robert.wilson@newshub.com',
        firstName: 'Robert',
        lastName: 'Wilson',
        role: 'author',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];
  }

  getMockDashboardStats() {
    return {
      totalArticles: 24,
      totalCategories: 6,
      totalUsers: 12,
      totalViews: 15420,
      recentArticles: this.getMockArticles().slice(0, 5),
      topArticles: this.getMockArticles().slice(0, 3)
    };
  }

  getMockBreakingNews() {
    return [
      {
        _id: '1',
        title: 'Major developments in technology sector as AI breakthrough announced',
        titleHindi: 'प्रौद्योगिकी क्षेत्र में बड़े विकास के रूप में एआई सफलता की घोषणा',
        content: 'New AI breakthrough announced in technology sector • New sports records broken • Entertainment industry updates',
        contentHindi: 'प्रौद्योगिकी क्षेत्र में नई एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट',
        isActive: true,
        priority: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        _id: '2',
        title: 'Breaking: Major sports records broken in championship finals',
        titleHindi: 'तोड़ने वाली खबर: चैम्पियनशिप फाइनल में बड़े खेल रिकॉर्ड टूटे',
        content: 'New sports records broken in championship finals • Technology sector updates • Business news highlights',
        contentHindi: 'चैम्पियनशिप फाइनल में नए खेल रिकॉर्ड टूटे • प्रौद्योगिकी क्षेत्र अपडेट • व्यापार समाचार के मुख्य आकर्षण',
        isActive: true,
        priority: 2,
        createdAt: '2024-01-14T15:45:00Z',
        updatedAt: '2024-01-14T15:45:00Z'
      },
      {
        _id: '3',
        title: 'Entertainment industry updates and celebrity news',
        titleHindi: 'मनोरंजन उद्योग अपडेट और सेलिब्रिटी समाचार',
        content: 'Entertainment industry updates • Technology breakthroughs • Sports highlights',
        contentHindi: 'मनोरंजन उद्योग अपडेट • प्रौद्योगिकी सफलताएं • खेल के मुख्य आकर्षण',
        isActive: false,
        priority: 3,
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z'
      }
    ];
  }
} 