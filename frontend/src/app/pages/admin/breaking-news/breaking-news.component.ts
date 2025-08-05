import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, BreakingNews, CreateBreakingNewsDto } from '../../../services/api.service';

@Component({
  selector: 'app-breaking-news',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="breaking-news-management">
      <div class="header">
        <h2>Breaking News Management</h2>
        <button mat-raised-button color="primary" (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
          Add Breaking News
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading breaking news...</p>
      </div>

      <!-- Breaking News List -->
      <div *ngIf="!loading" class="news-list">
        <mat-card *ngFor="let news of breakingNews" class="news-card">
          <mat-card-header>
            <mat-card-title>
              <div class="title-row">
                <span class="title">{{ news.title }}</span>
                <div class="status-badges">
                  <mat-chip [class.active]="news.isActive" class="status-chip">
                    {{ news.isActive ? 'Active' : 'Inactive' }}
                  </mat-chip>
                  <mat-chip class="priority-chip">Priority: {{ news.priority }}</mat-chip>
                </div>
              </div>
            </mat-card-title>
            <mat-card-subtitle>
              Created: {{ formatDate(news.createdAt) }} | Updated: {{ formatDate(news.updatedAt) }}
            </mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="content-section">
              <h4>English Content:</h4>
              <p>{{ news.content }}</p>
            </div>
            <div class="content-section">
              <h4>Hindi Content:</h4>
              <p>{{ news.contentHindi }}</p>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button color="primary" (click)="editNews(news)">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
            <button mat-button [color]="news.isActive ? 'warn' : 'primary'" (click)="toggleStatus(news)">
              <mat-icon>{{ news.isActive ? 'visibility_off' : 'visibility' }}</mat-icon>
              {{ news.isActive ? 'Deactivate' : 'Activate' }}
            </button>
            <button mat-button color="warn" (click)="deleteNews(news)">
              <mat-icon>delete</mat-icon>
              Delete
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <!-- No News Message -->
      <div *ngIf="!loading && breakingNews.length === 0" class="no-news">
        <mat-icon class="no-news-icon">newspaper</mat-icon>
        <h3>No breaking news available</h3>
        <p>Add your first breaking news item to get started.</p>
      </div>
    </div>
  `,
  styles: [`
    .breaking-news-management {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h2 {
      margin: 0;
      color: #1e293b;
      font-size: 24px;
      font-weight: 700;
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

    .news-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .news-card {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      flex: 1;
    }

    .status-badges {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }

    .status-chip {
      font-size: 12px;
      font-weight: 600;
    }

    .status-chip.active {
      background: #10b981;
      color: white;
    }

    .priority-chip {
      background: #3b82f6;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }

    .content-section {
      margin-bottom: 20px;
    }

    .content-section h4 {
      color: #374151;
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .content-section p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      background: #f9fafb;
      padding: 12px;
      border-radius: 8px;
    }

    mat-card-actions {
      display: flex;
      gap: 10px;
      padding: 16px;
    }

    .no-news {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 60px 0;
      text-align: center;
    }

    .no-news-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #94a3b8;
    }

    .no-news h3 {
      color: #1e293b;
      font-size: 24px;
      margin: 0;
    }

    .no-news p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .title-row {
        flex-direction: column;
        gap: 10px;
      }

      .status-badges {
        align-self: flex-start;
      }

      mat-card-actions {
        flex-direction: column;
      }
    }
  `]
})
export class BreakingNewsComponent implements OnInit {
  breakingNews: BreakingNews[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadBreakingNews();
  }

  loadBreakingNews() {
    this.loading = true;
    this.apiService.getBreakingNews().subscribe({
      next: (news) => {
        this.breakingNews = news.sort((a, b) => b.priority - a.priority);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading breaking news:', error);
        this.snackBar.open('Error loading breaking news', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openAddDialog() {
    // This would open a dialog to add new breaking news
    console.log('Open add dialog');
    this.snackBar.open('Add dialog functionality coming soon', 'Close', { duration: 3000 });
  }

  editNews(news: BreakingNews) {
    // This would open a dialog to edit breaking news
    console.log('Edit news:', news);
    this.snackBar.open('Edit dialog functionality coming soon', 'Close', { duration: 3000 });
  }

  toggleStatus(news: BreakingNews) {
    this.apiService.toggleBreakingNewsStatus(news._id).subscribe({
      next: (updatedNews) => {
        const index = this.breakingNews.findIndex(n => n._id === news._id);
        if (index !== -1) {
          this.breakingNews[index] = updatedNews;
        }
        this.snackBar.open(
          `Breaking news ${updatedNews.isActive ? 'activated' : 'deactivated'} successfully`,
          'Close',
          { duration: 3000 }
        );
      },
      error: (error) => {
        console.error('Error toggling status:', error);
        this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
      }
    });
  }

  deleteNews(news: BreakingNews) {
    if (confirm(`Are you sure you want to delete "${news.title}"?`)) {
      this.apiService.deleteBreakingNews(news._id).subscribe({
        next: () => {
          this.breakingNews = this.breakingNews.filter(n => n._id !== news._id);
          this.snackBar.open('Breaking news deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting breaking news:', error);
          this.snackBar.open('Error deleting breaking news', 'Close', { duration: 3000 });
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 