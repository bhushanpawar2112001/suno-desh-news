import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, Category, Article } from '../../services/api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex justify-center items-center py-20">
          <mat-spinner diameter="50"></mat-spinner>
          <span class="ml-4 text-gray-600">Loading category...</span>
        </div>

        <!-- Category Content -->
        <div *ngIf="!isLoading">
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ categoryName }}</h1>
            <p class="text-lg text-gray-600">{{ categoryDescription }}</p>
          </div>

          <!-- Articles Grid -->
          <div *ngIf="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <mat-card class="card hover:shadow-lg transition-shadow duration-300" *ngFor="let article of articles">
              <img mat-card-image 
                   [src]="getArticleImage(article)" 
                   [alt]="article.title"
                   (error)="onImageError($event)"
                   class="article-image">
              <mat-card-content class="p-6">
                <mat-chip-listbox>
                  <mat-chip-option color="primary" selected>{{ categoryName }}</mat-chip-option>
                </mat-chip-listbox>
                <h3 class="text-xl font-semibold mt-4 mb-2">{{ article.title }}</h3>
                <p class="text-gray-600 mb-4">
                  {{ article.excerpt }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">By {{ article.author.firstName }} {{ article.author.lastName }} • {{ formatDate(article.createdAt) }}</span>
                  <button mat-button color="primary" [routerLink]="['/article', article.slug]">
                    Read More
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- No Articles -->
          <div *ngIf="articles.length === 0" class="text-center py-20">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">No articles found</h3>
            <p class="text-gray-600">No articles are available in this category yet.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .article-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background-color: #f3f4f6;
    }
    
    .card {
      transition: transform 0.2s ease-in-out;
    }
    
    .card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class CategoryComponent implements OnInit {
  categoryName = '';
  categoryDescription = '';
  articles: Article[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    console.log('CategoryComponent initialized');
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      console.log('Category slug from route:', slug);
      this.loadCategoryData(slug);
    });
  }

  private loadCategoryData(slug: string) {
    console.log('Loading category data for slug:', slug);
    this.isLoading = true;
    
    // Load category details
    this.apiService.getCategoryBySlug(slug).subscribe({
      next: (category) => {
        console.log('Category loaded:', category);
        this.categoryName = category.name;
        this.categoryDescription = category.description;
        
        // Load articles for this category
        this.apiService.getArticlesByCategory(slug).subscribe({
          next: (articles) => {
            console.log('Articles loaded:', articles);
            this.articles = articles;
            this.isLoading = false;
          },
          error: (error) => {
            console.log('Error loading articles:', error);
            this.articles = [];
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.log('Error loading category, using fallback data:', error);
        // Fallback to mock data if API fails
        this.categoryName = this.getCategoryNameFromSlug(slug);
        this.categoryDescription = this.getCategoryDescriptionFromSlug(slug);
        this.articles = this.getMockArticlesForCategory(slug);
        this.isLoading = false;
      }
    });
  }

  private getCategoryNameFromSlug(slug: string): string {
    const categoryMap: { [key: string]: string } = {
      'technology': 'Technology',
      'sports': 'Sports',
      'business': 'Business',
      'health': 'Health',
      'entertainment': 'Entertainment',
      'science': 'Science',
      'politics': 'Politics',
      'world': 'World',
      'national': 'National',
      'local': 'Local'
    };
    return categoryMap[slug] || 'Category';
  }

  private getCategoryDescriptionFromSlug(slug: string): string {
    const descriptionMap: { [key: string]: string } = {
      'technology': 'Latest technology news, innovations, and updates from around the world.',
      'sports': 'Sports news, updates, and analysis from various sports and leagues.',
      'business': 'Business news, market updates, and economic analysis.',
      'health': 'Health news, medical breakthroughs, and wellness information.',
      'entertainment': 'Entertainment news, celebrity updates, and cultural events.',
      'science': 'Scientific discoveries, research updates, and technological advancements.',
      'politics': 'Political news, policy updates, and government developments.',
      'world': 'International news and global developments.',
      'national': 'National news and domestic developments.',
      'local': 'Local news and community updates.'
    };
    return descriptionMap[slug] || 'Latest news and updates in this category.';
  }

  private getMockArticlesForCategory(slug: string): Article[] {
    const mockArticles: { [key: string]: Article[] } = {
      'technology': [
        {
          _id: '1',
          title: 'AI Breakthrough in Healthcare',
          titleHindi: 'हेल्थकेयर में AI की क्रांति',
          slug: 'ai-breakthrough',
          content: 'Revolutionary AI technology promises to transform medical diagnosis and treatment...',
          contentHindi: 'क्रांतिकारी AI तकनीक चिकित्सा निदान और उपचार को बदलने का वादा करती है...',
                     excerpt: 'Revolutionary AI technology promises to transform medical diagnosis and treatment...',
           excerptHindi: 'क्रांतिकारी AI तकनीक चिकित्सा निदान और उपचार को बदलने का वादा करती है...',
           featuredImage: 'https://picsum.photos/400/250?random=tech1',
           category: {
            _id: '1',
            name: 'Technology',
            nameHindi: 'तकनीक',
            slug: 'technology',
            description: 'Latest technology news, innovations, and updates from around the world.',
            descriptionHindi: 'दुनिया भर से नवीनतम तकनीक समाचार, नवाचार और अपडेट।',
            isActive: true,
            articleCount: 15,
            rank: 1,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          author: {
            _id: '1',
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'author',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          status: 'published',
          isFeatured: true,
          isActive: true,
          tags: ['AI', 'Healthcare', 'Technology'],
          viewCount: 1250,
          likeCount: 45,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          _id: '2',
          title: 'Quantum Computing Milestone',
          titleHindi: 'क्वांटम कंप्यूटिंग में मील का पत्थर',
          slug: 'quantum-computing',
          content: 'Scientists achieve major breakthrough in quantum computing research...',
          contentHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग अनुसंधान में बड़ी सफलता हासिल की...',
                     excerpt: 'Scientists achieve major breakthrough in quantum computing research...',
           excerptHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग अनुसंधान में बड़ी सफलता हासिल की...',
           featuredImage: 'https://picsum.photos/400/250?random=tech2',
           category: {
            _id: '1',
            name: 'Technology',
            nameHindi: 'तकनीक',
            slug: 'technology',
            description: 'Latest technology news, innovations, and updates from around the world.',
            descriptionHindi: 'दुनिया भर से नवीनतम तकनीक समाचार, नवाचार और अपडेट।',
            isActive: true,
            articleCount: 15,
            rank: 1,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          author: {
            _id: '2',
            email: 'jane.smith@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            role: 'author',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          status: 'published',
          isFeatured: false,
          isActive: true,
          tags: ['Quantum Computing', 'Research', 'Technology'],
          viewCount: 890,
          likeCount: 32,
          createdAt: '2024-01-15T08:00:00Z',
          updatedAt: '2024-01-15T08:00:00Z'
        },
        {
          _id: '3',
          title: '5G Network Expansion',
          titleHindi: '5G नेटवर्क विस्तार',
          slug: '5g-expansion',
          content: 'Global 5G network coverage reaches new milestones...',
          contentHindi: 'वैश्विक 5G नेटवर्क कवरेज नए मील के पत्थर तक पहुंच गया...',
                     excerpt: 'Global 5G network coverage reaches new milestones...',
           excerptHindi: 'वैश्विक 5G नेटवर्क कवरेज नए मील के पत्थर तक पहुंच गया...',
           featuredImage: 'https://picsum.photos/400/250?random=tech3',
           category: {
            _id: '1',
            name: 'Technology',
            nameHindi: 'तकनीक',
            slug: 'technology',
            description: 'Latest technology news, innovations, and updates from around the world.',
            descriptionHindi: 'दुनिया भर से नवीनतम तकनीक समाचार, नवाचार और अपडेट।',
            isActive: true,
            articleCount: 15,
            rank: 1,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          author: {
            _id: '3',
            email: 'mike.johnson@example.com',
            firstName: 'Mike',
            lastName: 'Johnson',
            role: 'author',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          status: 'published',
          isFeatured: false,
          isActive: true,
          tags: ['5G', 'Network', 'Technology'],
          viewCount: 650,
          likeCount: 28,
          createdAt: '2024-01-15T06:00:00Z',
          updatedAt: '2024-01-15T06:00:00Z'
        }
      ]
    };
    
    return mockArticles[slug] || [];
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  }

  getArticleImage(article: Article): string {
    // Use featuredImage if available, otherwise use a reliable placeholder
    if (article.featuredImage && article.featuredImage.trim() !== '') {
      return article.featuredImage;
    }
    
    // Use a more reliable placeholder service
    return `https://picsum.photos/400/250?random=${article._id}`;
  }

  onImageError(event: any) {
    // If image fails to load, use a fallback
    const img = event.target as HTMLImageElement;
    img.src = 'https://picsum.photos/400/250?random=fallback';
  }
} 