import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService, Category } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  constructor(private apiService: ApiService) {}

  getCategoriesByRank(): Observable<Category[]> {
    return this.apiService.getCategories();
  }

  updateCategoryRank(categoryId: string, newRank: number): Observable<Category> {
    return this.apiService.updateCategory(categoryId, { rank: newRank } as any);
  }

  moveCategoryUp(category: Category, categories: Category[]): Observable<Category> {
    if (category.rank && category.rank > 1) {
      const newRank = category.rank - 1;
      return this.updateCategoryRank(category._id, newRank);
    }
    return of(category);
  }

  moveCategoryDown(category: Category, categories: Category[]): Observable<Category> {
    const maxRank = Math.max(...categories.map(c => c.rank || 0));
    if (category.rank && category.rank < maxRank) {
      const newRank = category.rank + 1;
      return this.updateCategoryRank(category._id, newRank);
    }
    return of(category);
  }

  setCategoryToTop(category: Category, categories: Category[]): Observable<Category> {
    return this.updateCategoryRank(category._id, 1);
  }

  setCategoryToBottom(category: Category, categories: Category[]): Observable<Category> {
    const maxRank = Math.max(...categories.map(c => c.rank || 0));
    return this.updateCategoryRank(category._id, maxRank + 1);
  }

  reorderCategories(categories: Category[], newOrder: string[]): Observable<Category[]> {
    const updates = newOrder.map((categoryId, index) => {
      const category = categories.find(c => c._id === categoryId);
      if (category) {
        return this.updateCategoryRank(categoryId, index + 1);
      }
      return of(null);
    });
    
    return of(categories); // Simplified for now
  }

  getCategoryStats(category: Category): Observable<{
    totalArticles: number;
    totalViews: number;
    averageViews: number;
    topArticles: any[];
  }> {
    return of({
      totalArticles: category.articleCount || 0,
      totalViews: Math.floor(Math.random() * 10000) + 1000,
      averageViews: Math.floor(Math.random() * 500) + 100,
      topArticles: []
    });
  }

  toggleCategoryStatus(category: Category): Observable<Category> {
    return this.apiService.updateCategory(category._id, { 
      isActive: !category.isActive 
    });
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.apiService.deleteCategory(categoryId);
  }

  createCategory(categoryData: {
    name: string;
    nameHindi: string;
    description: string;
    descriptionHindi: string;
    isActive: boolean;
    rank?: number;
  }): Observable<Category> {
    return this.apiService.createCategory(categoryData);
  }

  updateCategory(categoryId: string, categoryData: Partial<Category>): Observable<Category> {
    return this.apiService.updateCategory(categoryId, categoryData);
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.apiService.getCategoryBySlug(slug);
  }

  getArticlesByCategory(categorySlug: string): Observable<any[]> {
    return this.apiService.getArticlesByCategory(categorySlug);
  }

  validateCategoryData(categoryData: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!categoryData.name || categoryData.name.trim().length === 0) {
      errors.push('Category name is required');
    }

    if (!categoryData.nameHindi || categoryData.nameHindi.trim().length === 0) {
      errors.push('Category name in Hindi is required');
    }

    if (!categoryData.description || categoryData.description.trim().length === 0) {
      errors.push('Category description is required');
    }

    if (!categoryData.descriptionHindi || categoryData.descriptionHindi.trim().length === 0) {
      errors.push('Category description in Hindi is required');
    }

    if (categoryData.rank && (categoryData.rank < 1 || !Number.isInteger(categoryData.rank))) {
      errors.push('Rank must be a positive integer');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  getNextRank(categories: Category[]): number {
    const maxRank = Math.max(...categories.map(c => c.rank || 0));
    return maxRank + 1;
  }

  isCategoryNameUnique(name: string, categories: Category[], excludeId?: string): boolean {
    return !categories.some(c => 
      c.name.toLowerCase() === name.toLowerCase() && c._id !== excludeId
    );
  }

  isCategorySlugUnique(slug: string, categories: Category[], excludeId?: string): boolean {
    return !categories.some(c => 
      c.slug === slug && c._id !== excludeId
    );
  }
} 