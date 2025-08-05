import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ApiService, Category } from '../../services/api.service';

@Component({
  selector: 'app-news-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule, MatMenuModule, MatBadgeModule],
  template: `
    <div class="news-categories-section">
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <h2 class="section-title">
            <mat-icon class="title-icon">category</mat-icon>
            News Categories
          </h2>
          <p class="section-subtitle">Explore news by categories and topics</p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading categories...</p>
        </div>

        <!-- Categories Grid -->
        <div *ngIf="!isLoading && categories.length > 0" class="categories-grid">
          <div *ngFor="let category of sortedCategories; trackBy: trackByCategory" class="category-card">
            <mat-card class="category-mat-card" (click)="onCategoryClick(category)">
              <div class="category-header">
                <div class="category-icon">
                  <mat-icon>{{ getCategoryIcon(category.slug) }}</mat-icon>
                </div>
                <div class="category-rank" *ngIf="category.rank">
                  <span class="rank-badge">#{{ category.rank }}</span>
                </div>
              </div>
              
              <mat-card-content>
                <h3 class="category-title">{{ getCategoryName(category) }}</h3>
                <p class="category-description">{{ getCategoryDescription(category) }}</p>
                
                <div class="category-stats">
                  <div class="stat-item">
                    <mat-icon class="stat-icon">article</mat-icon>
                    <span class="stat-value">{{ category.articleCount || 0 }}</span>
                    <span class="stat-label">Articles</span>
                  </div>
                  
                  <div class="stat-item">
                    <mat-icon class="stat-icon">visibility</mat-icon>
                    <span class="stat-value">{{ getCategoryViews(category) | number }}</span>
                    <span class="stat-label">Views</span>
                  </div>
                </div>

                <div class="category-tags">
                  <mat-chip class="category-chip" [style.background]="getCategoryColor(category.slug)">
                    {{ category.name }}
                  </mat-chip>
                  <mat-chip class="status-chip" [class.active]="category.isActive">
                    {{ category.isActive ? 'Active' : 'Inactive' }}
                  </mat-chip>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- No Categories -->
        <div *ngIf="!isLoading && categories.length === 0" class="no-categories">
          <mat-icon class="no-categories-icon">category</mat-icon>
          <h3>No categories available</h3>
          <p>Categories will appear here once they are added to the system</p>
        </div>

        <!-- Category Management (Admin Only) -->
        <div *ngIf="isAdmin" class="admin-section">
          <div class="admin-header">
            <h3>Category Management</h3>
            <button mat-raised-button color="primary" (click)="addNewCategory()">
              <mat-icon>add</mat-icon>
              Add Category
            </button>
          </div>
          
          <div class="category-management">
            <div *ngFor="let category of categories" class="management-item">
              <div class="category-info">
                <span class="category-name">{{ getCategoryName(category) }}</span>
                <span class="category-rank">Rank: {{ category.rank || 'Unranked' }}</span>
              </div>
              
              <div class="management-actions">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="editCategory(category)">
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                  <button mat-menu-item (click)="changeRank(category, 'up')" [disabled]="(category.rank || 0) <= 1">
                    <mat-icon>keyboard_arrow_up</mat-icon>
                    Move Up
                  </button>
                  <button mat-menu-item (click)="changeRank(category, 'down')" [disabled]="(category.rank || 0) >= categories.length">
                    <mat-icon>keyboard_arrow_down</mat-icon>
                    Move Down
                  </button>
                  <button mat-menu-item (click)="toggleCategoryStatus(category)">
                    <mat-icon>{{ category.isActive ? 'visibility_off' : 'visibility' }}</mat-icon>
                    {{ category.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button mat-menu-item (click)="deleteCategory(category)" class="delete-action">
                    <mat-icon>delete</mat-icon>
                    Delete
                  </button>
                </mat-menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .news-categories-section {
      padding: 40px 0;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-title {
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

    .section-subtitle {
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
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
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
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px 20px 0 20px;
    }

    .category-icon {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .category-rank {
      position: relative;
    }

    .rank-badge {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
      display: inline-block;
    }

    .category-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin: 15px 0 8px 0;
      line-height: 1.4;
    }

    .category-description {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 15px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .category-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .stat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #64748b;
    }

    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-label {
      font-size: 10px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .category-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .category-chip {
      color: white;
      font-weight: 600;
      font-size: 12px;
    }

    .status-chip {
      font-size: 10px;
      font-weight: 600;
      background: #e2e8f0;
      color: #64748b;
    }

    .status-chip.active {
      background: #10b981;
      color: white;
    }

    .no-categories {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 60px 0;
      text-align: center;
    }

    .no-categories-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #94a3b8;
    }

    .no-categories h3 {
      color: #1e293b;
      font-size: 24px;
      margin: 0;
    }

    .no-categories p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }

    /* Admin Section */
    .admin-section {
      margin-top: 40px;
      padding-top: 40px;
      border-top: 2px solid #e2e8f0;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .admin-header h3 {
      color: #1e293b;
      font-size: 20px;
      margin: 0;
    }

    .category-management {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .management-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .management-item:last-child {
      border-bottom: none;
    }

    .category-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .category-name {
      font-weight: 600;
      color: #1e293b;
    }

    .category-rank {
      font-size: 12px;
      color: #64748b;
    }

    .delete-action {
      color: #ef4444;
    }

    @media (max-width: 768px) {
      .news-categories-section {
        padding: 20px 0;
      }

      .section-title {
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

      .container {
        padding: 0 15px;
      }

      .admin-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }
    }

    @media (max-width: 480px) {
      .section-title {
        font-size: 20px;
      }

      .section-subtitle {
        font-size: 14px;
      }

      .category-title {
        font-size: 16px;
      }

      .category-stats {
        gap: 15px;
      }
    }
  `]
})
export class NewsCategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading = true;
  isAdmin = false; // This would be set based on user role

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.checkAdminStatus();
  }

  loadCategories() {
    this.isLoading = true;
    
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: () => {
        this.categories = [];
        this.isLoading = false;
      }
    });
  }

  checkAdminStatus() {
    // This would check if user is admin
    // For now, setting to false
    this.isAdmin = false;
  }

  get sortedCategories(): Category[] {
    return [...this.categories].sort((a, b) => {
      // Sort by rank first, then by name
      const rankA = a.rank || 999;
      const rankB = b.rank || 999;
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      return a.name.localeCompare(b.name);
    });
  }

  trackByCategory(index: number, category: Category): string {
    return category._id;
  }

  getCategoryName(category: Category): string {
    // This would use language service to get current language
    return category.name;
  }

  getCategoryDescription(category: Category): string {
    // This would use language service to get current language
    return category.description;
  }

  getCategoryIcon(slug: string): string {
    const iconMap: { [key: string]: string } = {
      'technology': 'computer',
      'sports': 'sports_soccer',
      'business': 'business',
      'health': 'health_and_safety',
      'entertainment': 'movie',
      'science': 'science',
      'politics': 'gavel',
      'world': 'public',
      'national': 'flag',
      'local': 'location_on'
    };
    return iconMap[slug] || 'article';
  }

  getCategoryColor(slug: string): string {
    const colorMap: { [key: string]: string } = {
      'technology': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      'sports': 'linear-gradient(135deg, #10b981, #059669)',
      'business': 'linear-gradient(135deg, #f59e0b, #d97706)',
      'health': 'linear-gradient(135deg, #ef4444, #dc2626)',
      'entertainment': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      'science': 'linear-gradient(135deg, #06b6d4, #0891b2)',
      'politics': 'linear-gradient(135deg, #f97316, #ea580c)',
      'world': 'linear-gradient(135deg, #84cc16, #65a30d)',
      'national': 'linear-gradient(135deg, #ec4899, #db2777)',
      'local': 'linear-gradient(135deg, #6366f1, #4f46e5)'
    };
    return colorMap[slug] || 'linear-gradient(135deg, #64748b, #475569)';
  }

  getCategoryViews(category: Category): number {
    // This would calculate total views for articles in this category
    return Math.floor(Math.random() * 10000) + 1000; // Mock data
  }

  // Admin functions
  addNewCategory() {
    console.log('Add new category');
    // This would open a modal or navigate to category creation
  }

  editCategory(category: Category) {
    console.log('Edit category:', category.name);
    // This would open edit modal
  }

  changeRank(category: Category, direction: 'up' | 'down') {
    console.log(`Move ${category.name} ${direction}`);
    // This would update category rank in backend
  }

  toggleCategoryStatus(category: Category) {
    console.log(`Toggle status for ${category.name}`);
    // This would update category status in backend
  }

  deleteCategory(category: Category) {
    console.log(`Delete category: ${category.name}`);
    // This would show confirmation dialog and delete
  }

  onCategoryClick(category: Category) {
    console.log(`Category clicked: ${category.name} (${category.slug})`);
    console.log('Current URL:', window.location.href);
    console.log('Target URL:', `/category/${category.slug}`);
    
    // Use programmatic navigation instead of routerLink
    this.router.navigate(['/category', category.slug]);
  }
} 