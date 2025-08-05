import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-admin',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="test-admin-container">
      <mat-card class="test-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="success-icon">check_circle</mat-icon>
            Admin Panel Test
          </mat-card-title>
          <mat-card-subtitle>Admin panel is working correctly!</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="test-info">
            <h3>✅ Admin Panel Status: Working</h3>
            <p>You have successfully accessed the admin panel. This confirms that:</p>
            <ul>
              <li>Authentication is working</li>
              <li>Route protection is active</li>
              <li>Admin layout is loading</li>
              <li>Navigation is functional</li>
            </ul>
          </div>
          
          <div class="admin-actions">
            <h4>Quick Actions:</h4>
            <div class="action-buttons">
              <button mat-raised-button color="primary">
                <mat-icon>dashboard</mat-icon>
                Go to Dashboard
              </button>
              <button mat-raised-button color="accent">
                <mat-icon>article</mat-icon>
                Manage Articles
              </button>
              <button mat-raised-button color="warn">
                <mat-icon>category</mat-icon>
                Manage Categories
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .test-admin-container {
      padding: 20px;
    }

    .test-card {
      max-width: 600px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-header {
      margin-bottom: 20px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
    }

    .success-icon {
      color: #10b981;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    mat-card-subtitle {
      font-size: 16px;
      color: #64748b;
    }

    .test-info {
      margin-bottom: 30px;
    }

    .test-info h3 {
      color: #10b981;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 15px 0;
    }

    .test-info p {
      color: #64748b;
      font-size: 14px;
      margin: 0 0 15px 0;
    }

    .test-info ul {
      color: #64748b;
      font-size: 14px;
      padding-left: 20px;
    }

    .test-info li {
      margin-bottom: 8px;
    }

    .admin-actions {
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
    }

    .admin-actions h4 {
      color: #1e293b;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 15px 0;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .action-buttons button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
      }
      
      .action-buttons button {
        width: 100%;
      }
    }
  `]
})
export class TestAdminComponent {
  constructor() {}
} 