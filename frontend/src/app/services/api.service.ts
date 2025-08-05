import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { FallbackDataService } from './fallback-data.service';

export interface Article {
  _id: string;
  title: string;
  titleHindi: string;
  slug: string;
  content: string;
  contentHindi: string;
  excerpt: string;
  excerptHindi: string;
  featuredImage: string;
  category: Category;
  author: User;
  status: string;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  descriptionHindi: string;
  isActive: boolean;
  articleCount: number;
  rank?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface CreateArticleDto {
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  excerpt: string;
  excerptHindi: string;
  categoryId: string;
  featuredImage: string;
  status: string;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
}

export interface CreateCategoryDto {
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  isActive: boolean;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isActive: boolean;
}

export interface BreakingNews {
  _id: string;
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBreakingNewsDto {
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  isActive: boolean;
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://aawashyak.com/api';

  constructor(
    private http: HttpClient,
    private fallbackDataService: FallbackDataService
  ) {}

  // Articles
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`).pipe(
      catchError(() => of(this.fallbackDataService.getMockArticles()))
    );
  }

  getFeaturedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles/featured`).pipe(
      catchError(() => of(this.fallbackDataService.getMockArticles().filter(article => article.isFeatured)))
    );
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`).pipe(
      catchError(() => of(this.fallbackDataService.getMockArticles().find(article => article._id === id) || this.fallbackDataService.getMockArticles()[0]))
    );
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/slug/${slug}`).pipe(
      catchError(() => of(this.fallbackDataService.getMockArticles().find(article => article.slug === slug) || this.fallbackDataService.getMockArticles()[0]))
    );
  }

  getArticlesByCategory(categorySlug: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?category=${categorySlug}`).pipe(
      catchError(() => of(this.fallbackDataService.getMockArticles().filter(article => article.category.slug === categorySlug)))
    );
  }

  createArticle(article: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/articles`, article);
  }

  updateArticle(id: string, article: Partial<CreateArticleDto>): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/articles/${id}`);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`).pipe(
      catchError(() => of(this.fallbackDataService.getMockCategories()))
    );
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/slug/${slug}`).pipe(
      catchError(() => of(this.fallbackDataService.getMockCategories().find(category => category.slug === slug) || this.fallbackDataService.getMockCategories()[0]))
    );
  }

  createCategory(category: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(id: string, category: Partial<CreateCategoryDto>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(id: string, user: Partial<CreateUserDto>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  // Authentication
  login(credentials: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.baseUrl}/auth/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {});
  }

  // Increment view count
  incrementViewCount(articleId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/articles/${articleId}/view`, {});
  }

  // Breaking News
  getBreakingNews(): Observable<BreakingNews[]> {
    return this.http.get<BreakingNews[]>(`${this.baseUrl}/breaking-news`).pipe(
      catchError(() => of(this.fallbackDataService.getMockBreakingNews()))
    );
  }

  getActiveBreakingNews(): Observable<BreakingNews[]> {
    return this.http.get<BreakingNews[]>(`${this.baseUrl}/breaking-news/active`).pipe(
      catchError(() => of(this.fallbackDataService.getMockBreakingNews().filter(news => news.isActive)))
    );
  }

  createBreakingNews(breakingNews: CreateBreakingNewsDto): Observable<BreakingNews> {
    return this.http.post<BreakingNews>(`${this.baseUrl}/breaking-news`, breakingNews);
  }

  updateBreakingNews(id: string, breakingNews: Partial<CreateBreakingNewsDto>): Observable<BreakingNews> {
    return this.http.put<BreakingNews>(`${this.baseUrl}/breaking-news/${id}`, breakingNews);
  }

  deleteBreakingNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/breaking-news/${id}`);
  }

  toggleBreakingNewsStatus(id: string): Observable<BreakingNews> {
    return this.http.patch<BreakingNews>(`${this.baseUrl}/breaking-news/${id}/toggle`, {});
  }

  // Dashboard stats
  getDashboardStats(): Observable<{
    totalArticles: number;
    totalCategories: number;
    totalUsers: number;
    totalViews: number;
    recentArticles: Article[];
    topArticles: Article[];
  }> {
    return this.http.get<{
      totalArticles: number;
      totalCategories: number;
      totalUsers: number;
      totalViews: number;
      recentArticles: Article[];
      topArticles: Article[];
    }>(`${this.baseUrl}/dashboard/stats`).pipe(
      catchError(() => of(this.fallbackDataService.getMockDashboardStats()))
    );
  }
} 