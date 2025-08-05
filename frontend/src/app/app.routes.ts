import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('./pages/article-detail/article-detail.component').then(m => m.ArticleDetailComponent)
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-results/search-results.component').then(m => m.SearchResultsComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'articles',
        loadComponent: () => import('./pages/admin/articles/articles.component').then(m => m.ArticlesComponent)
      },
      {
        path: 'articles/create',
        loadComponent: () => import('./pages/admin/articles/create-article.component').then(m => m.CreateArticleComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/admin/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'categories/create',
        loadComponent: () => import('./pages/admin/categories/create-category.component').then(m => m.CreateCategoryComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'users/create',
        loadComponent: () => import('./pages/admin/users/create-user.component').then(m => m.CreateUserComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./components/traffic-dashboard/traffic-dashboard.component').then(m => m.TrafficDashboardComponent)
      },
      {
        path: 'breaking-news',
        loadComponent: () => import('./pages/admin/breaking-news/breaking-news.component').then(m => m.BreakingNewsComponent)
      },
      {
        path: 'test',
        loadComponent: () => import('./pages/admin/test-admin.component').then(m => m.TestAdminComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]; 