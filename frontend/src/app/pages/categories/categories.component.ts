import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  color: string;
  icon: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  viewCount: number;
  likeCount: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="categories-container">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1 class="title">
            <mat-icon class="title-icon">category</mat-icon>
            News Categories
          </h1>
          <p class="subtitle">Explore news by category and stay informed about topics that matter to you</p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading categories...</p>
        </div>

        <!-- Categories Grid -->
        <div *ngIf="!isLoading" class="categories-grid">
          <div *ngFor="let category of categories" class="category-card" (click)="viewCategory(category.slug)">
            <mat-card class="category-mat-card">
              <div class="category-header">
                <div class="category-icon" [style.background]="category.color">
                  <mat-icon>{{ category.icon }}</mat-icon>
                </div>
                <div class="category-info">
                  <h3 class="category-name">{{ category.name }}</h3>
                  <p class="category-description">{{ category.description }}</p>
                  <div class="category-stats">
                    <span class="article-count">{{ category.articleCount }} articles</span>
                  </div>
                </div>
              </div>
              <mat-card-actions>
                <button mat-button color="primary">
                  Browse Articles
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>

        <!-- Featured Articles -->
        <div *ngIf="!isLoading && featuredArticles.length > 0" class="featured-section">
          <h2 class="section-title">Featured Articles</h2>
          <div class="articles-grid">
            <div *ngFor="let article of featuredArticles" class="article-card" (click)="viewArticle(article.id)">
              <mat-card class="article-mat-card">
                <mat-card-content>
                  <div class="article-meta">
                    <span class="publish-date">{{ formatDate(article.publishedAt) }}</span>
                  </div>
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-excerpt">{{ article.excerpt }}</p>
                  <div class="article-footer">
                    <span class="author">By {{ article.author }}</span>
                    <div class="article-stats">
                      <span class="stat">
                        <mat-icon>visibility</mat-icon>
                        {{ article.viewCount }}
                      </span>
                      <span class="stat">
                        <mat-icon>thumb_up</mat-icon>
                        {{ article.likeCount }}
                      </span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding: 40px 0;
      min-height: 60vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 10px 0;
    }

    .title-icon {
      font-size: 36px;
      width: 36px;
      height: 36px;
      color: #3b82f6;
    }

    .subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 60px 0;
    }

    .loading-container p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 50px;
    }

    .category-card {
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-mat-card {
      height: 100%;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .category-mat-card:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .category-header {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      padding: 24px;
    }

    .category-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .category-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: white;
    }

    .category-info {
      flex: 1;
    }

    .category-name {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .category-description {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 12px 0;
    }

    .category-stats {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .article-count {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
    }

    mat-card-actions {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
    }

    mat-card-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }

    .featured-section {
      margin-top: 50px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 25px 0;
      text-align: center;
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .article-card {
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .article-card:hover {
      transform: translateY(-3px);
    }

    .article-mat-card {
      height: 100%;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .article-mat-card:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .article-meta {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 12px;
    }

    .publish-date {
      font-size: 12px;
      color: #64748b;
    }

    .article-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article-excerpt {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 12px 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .author {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
    }

    .article-stats {
      display: flex;
      gap: 12px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #64748b;
    }

    .stat mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }

    @media (max-width: 768px) {
      .categories-container {
        padding: 20px 0;
      }

      .title {
        font-size: 24px;
      }

      .title-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .categories-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .articles-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .container {
        padding: 0 15px;
      }
    }

    @media (max-width: 480px) {
      .title {
        font-size: 20px;
      }

      .subtitle {
        font-size: 14px;
      }

      .category-header {
        padding: 16px;
        gap: 15px;
      }

      .category-icon {
        width: 50px;
        height: 50px;
      }

      .category-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .category-name {
        font-size: 18px;
      }
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  featuredArticles: Article[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCategories();
    this.loadFeaturedArticles();
  }

  loadCategories() {
    // Mock data - replace with actual API call
    this.categories = [
      {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description: 'Latest tech news, innovations, and digital trends',
        articleCount: 15,
        color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        icon: 'computer'
      },
      {
        id: 2,
        name: 'Sports',
        slug: 'sports',
        description: 'Sports news, match updates, and athlete stories',
        articleCount: 12,
        color: 'linear-gradient(135deg, #10b981, #059669)',
        icon: 'sports_soccer'
      },
      {
        id: 3,
        name: 'Business',
        slug: 'business',
        description: 'Business news, market updates, and financial insights',
        articleCount: 18,
        color: 'linear-gradient(135deg, #f59e0b, #d97706)',
        icon: 'business'
      },
      {
        id: 4,
        name: 'Health',
        slug: 'health',
        description: 'Health news, medical breakthroughs, and wellness tips',
        articleCount: 10,
        color: 'linear-gradient(135deg, #ef4444, #dc2626)',
        icon: 'health_and_safety'
      },
      {
        id: 5,
        name: 'Entertainment',
        slug: 'entertainment',
        description: 'Entertainment news, celebrity updates, and cultural events',
        articleCount: 14,
        color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        icon: 'movie'
      },
      {
        id: 6,
        name: 'Science',
        slug: 'science',
        description: 'Scientific discoveries, research updates, and space news',
        articleCount: 8,
        color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        icon: 'science'
      }
    ];
  }

  loadFeaturedArticles() {
    // Mock data - replace with actual API call
    this.featuredArticles = [
      {
        id: 1,
        title: 'Breaking News: Major Technology Breakthrough',
        excerpt: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry...',
        publishedAt: '2024-01-15T10:30:00Z',
        author: 'John Smith',
        viewCount: 1250,
        likeCount: 89
      },
      {
        id: 2,
        title: 'Sports Update: Championship Finals',
        excerpt: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected...',
        publishedAt: '2024-01-14T15:45:00Z',
        author: 'Sarah Johnson',
        viewCount: 2100,
        likeCount: 156
      },
      {
        id: 3,
        title: 'Business News: Market Analysis',
        excerpt: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments...',
        publishedAt: '2024-01-13T09:15:00Z',
        author: 'Mike Chen',
        viewCount: 890,
        likeCount: 67
      }
    ];

    this.isLoading = false;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  viewCategory(slug: string) {
    this.router.navigate(['/category', slug]);
  }

  viewArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }
} 