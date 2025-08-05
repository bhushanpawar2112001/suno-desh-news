import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  viewCount?: number;
  likeCount?: number;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="search-results-container">
      <div class="container">
        <!-- Search Header -->
        <div class="search-header">
          <div class="search-info">
            <h1 class="search-title">
              <mat-icon class="search-icon">search</mat-icon>
              Search Results
            </h1>
            <p class="search-subtitle">
              Found {{ filteredArticles.length }} results for "{{ searchQuery }}"
            </p>
          </div>
          <button mat-button class="back-btn" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Searching for articles...</p>
        </div>

        <!-- No Results -->
        <div *ngIf="!isLoading && filteredArticles.length === 0" class="no-results">
          <mat-icon class="no-results-icon">search_off</mat-icon>
          <h2>No results found</h2>
          <p>Try searching with different keywords or browse our categories</p>
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>home</mat-icon>
            Go Home
          </button>
        </div>

        <!-- Search Results -->
        <div *ngIf="!isLoading && filteredArticles.length > 0" class="results-grid">
          <div *ngFor="let article of filteredArticles" class="article-card">
            <mat-card class="article-mat-card">
              <div class="article-image" *ngIf="article.imageUrl">
                <img [src]="article.imageUrl" [alt]="article.title">
              </div>
              <mat-card-content>
                <div class="article-meta">
                  <mat-chip class="category-chip">{{ article.category }}</mat-chip>
                  <span class="publish-date">{{ formatDate(article.publishedAt) }}</span>
                </div>
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-excerpt">{{ getExcerpt(article.content) }}</p>
                <div class="article-footer">
                  <span class="author">By {{ article.author }}</span>
                  <div class="article-stats">
                    <span class="stat">
                      <mat-icon>visibility</mat-icon>
                      {{ article.viewCount || 0 }}
                    </span>
                    <span class="stat">
                      <mat-icon>thumb_up</mat-icon>
                      {{ article.likeCount || 0 }}
                    </span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary" (click)="viewArticle(article.id)">
                  Read More
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results-container {
      padding: 40px 0;
      min-height: 60vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .search-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e2e8f0;
    }

    .search-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .search-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .search-icon {
      color: #3b82f6;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .search-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #3b82f6;
      font-weight: 600;
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

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 60px 0;
      text-align: center;
    }

    .no-results-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #94a3b8;
    }

    .no-results h2 {
      color: #1e293b;
      font-size: 24px;
      margin: 0;
    }

    .no-results p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
    }

    .article-card {
      transition: transform 0.3s ease;
    }

    .article-card:hover {
      transform: translateY(-5px);
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

    .article-image {
      height: 200px;
      overflow: hidden;
    }

    .article-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .article-mat-card:hover .article-image img {
      transform: scale(1.05);
    }

    .article-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .category-chip {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      font-weight: 600;
    }

    .publish-date {
      font-size: 12px;
      color: #64748b;
    }

    .article-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 12px 0;
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
      margin: 0 0 16px 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
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

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }

    mat-card-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .search-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .search-title {
        font-size: 24px;
      }

      .results-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .container {
        padding: 0 15px;
      }
    }

    @media (max-width: 480px) {
      .search-results-container {
        padding: 20px 0;
      }

      .search-title {
        font-size: 20px;
      }

      .search-subtitle {
        font-size: 14px;
      }
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  searchQuery = '';
  filteredArticles: Article[] = [];
  allArticles: Article[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });
  }

  performSearch() {
    this.isLoading = true;
    
    // Simulate API call delay
    setTimeout(() => {
      this.loadArticles();
      this.filterArticles();
      this.isLoading = false;
    }, 500);
  }

  loadArticles() {
    // Mock data - replace with actual API call
    this.allArticles = [
      {
        id: 1,
        title: 'Breaking News: Major Technology Breakthrough',
        content: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry...',
        category: 'Technology',
        author: 'John Smith',
        publishedAt: '2024-01-15T10:30:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search1',
        viewCount: 1250,
        likeCount: 89
      },
      {
        id: 2,
        title: 'Sports Update: Championship Finals',
        content: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected...',
        category: 'Sports',
        author: 'Sarah Johnson',
        publishedAt: '2024-01-14T15:45:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search2',
        viewCount: 2100,
        likeCount: 156
      },
      {
        id: 3,
        title: 'Business News: Market Analysis',
        content: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments...',
        category: 'Business',
        author: 'Mike Chen',
        publishedAt: '2024-01-13T09:15:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search3',
        viewCount: 890,
        likeCount: 67
      },
      {
        id: 4,
        title: 'Health & Wellness: New Research Findings',
        content: 'Recent studies reveal the importance of mental health awareness and its impact on overall well-being...',
        category: 'Health',
        author: 'Dr. Emily Brown',
        publishedAt: '2024-01-12T14:20:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search4',
        viewCount: 1560,
        likeCount: 234
      },
      {
        id: 5,
        title: 'Entertainment: Award Show Highlights',
        content: 'The annual entertainment awards ceremony celebrated outstanding achievements in film, music, and television...',
        category: 'Entertainment',
        author: 'Lisa Wang',
        publishedAt: '2024-01-11T20:00:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search5',
        viewCount: 3200,
        likeCount: 445
      },
      {
        id: 6,
        title: 'Science: Space Exploration Update',
        content: 'NASA announces new missions to explore distant planets and search for signs of extraterrestrial life...',
        category: 'Science',
        author: 'Dr. Robert Wilson',
        publishedAt: '2024-01-10T11:30:00Z',
        imageUrl: 'https://picsum.photos/400/200?random=search6',
        viewCount: 1890,
        likeCount: 178
      }
    ];
  }

  filterArticles() {
    if (!this.searchQuery.trim()) {
      this.filteredArticles = this.allArticles;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredArticles = this.allArticles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    );
  }

  getExcerpt(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  viewArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 