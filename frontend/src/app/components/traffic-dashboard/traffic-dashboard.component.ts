import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-traffic-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  template: `
    <div class="traffic-dashboard">
      <div class="dashboard-header">
        <h2>📊 Website Traffic Analytics</h2>
        <p>Real-time insights into your website performance</p>
      </div>

      <div class="stats-grid">
        <!-- Page Views -->
        <mat-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">👁️</div>
            <div class="stat-info">
              <h3>{{ totalPageViews | number }}</h3>
              <p>Total Page Views</p>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                +{{ pageViewsGrowth }}% this week
              </div>
            </div>
          </div>
        </mat-card>

        <!-- Unique Visitors -->
        <mat-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ uniqueVisitors | number }}</h3>
              <p>Unique Visitors</p>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                +{{ visitorsGrowth }}% this week
              </div>
            </div>
          </div>
        </mat-card>

        <!-- Average Session Duration -->
        <mat-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">⏱️</div>
            <div class="stat-info">
              <h3>{{ averageSessionDuration }}</h3>
              <p>Avg. Session Duration</p>
              <div class="stat-change positive">
                <mat-icon>trending_up</mat-icon>
                +{{ sessionGrowth }}% this week
              </div>
            </div>
          </div>
        </mat-card>

        <!-- Bounce Rate -->
        <mat-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
              <h3>{{ bounceRate }}%</h3>
              <p>Bounce Rate</p>
              <div class="stat-change negative">
                <mat-icon>trending_down</mat-icon>
                -{{ bounceRateChange }}% this week
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Popular Pages -->
      <mat-card class="section-card">
        <mat-card-header>
          <mat-card-title>🔥 Most Popular Pages</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="popular-pages">
            <div class="page-item" *ngFor="let page of popularPages; let i = index">
              <div class="page-rank">#{{ i + 1 }}</div>
              <div class="page-info">
                <h4>{{ page.title }}</h4>
                <p>{{ page.views | number }} views</p>
              </div>
              <div class="page-views">
                <mat-progress-bar 
                  [value]="page.percentage" 
                  color="primary">
                </mat-progress-bar>
                <span>{{ page.percentage }}%</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Traffic Sources -->
      <mat-card class="section-card">
        <mat-card-header>
          <mat-card-title>🌐 Traffic Sources</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="traffic-sources">
            <div class="source-item" *ngFor="let source of trafficSources">
              <div class="source-info">
                <div class="source-icon">{{ source.icon }}</div>
                <div class="source-details">
                  <h4>{{ source.name }}</h4>
                  <p>{{ source.visitors | number }} visitors</p>
                </div>
              </div>
              <div class="source-percentage">
                <mat-progress-bar 
                  [value]="source.percentage" 
                  [color]="source.color">
                </mat-progress-bar>
                <span>{{ source.percentage }}%</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Real-time Visitors -->
      <mat-card class="section-card">
        <mat-card-header>
          <mat-card-title>🟢 Real-time Visitors</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="realtime-stats">
            <div class="realtime-item">
              <div class="realtime-number">{{ realtimeVisitors }}</div>
              <div class="realtime-label">Currently Online</div>
            </div>
            <div class="realtime-item">
              <div class="realtime-number">{{ todayVisitors | number }}</div>
              <div class="realtime-label">Today's Visitors</div>
            </div>
            <div class="realtime-item">
              <div class="realtime-number">{{ thisWeekVisitors | number }}</div>
              <div class="realtime-label">This Week</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .traffic-dashboard {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .dashboard-header h2 {
      color: #1f2937;
      margin-bottom: 10px;
    }

    .dashboard-header p {
      color: #6b7280;
      font-size: 16px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-content {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-right: 15px;
    }

    .stat-info h3 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 5px 0;
    }

    .stat-info p {
      color: #6b7280;
      margin: 0 0 10px 0;
    }

    .stat-change {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .stat-change.positive {
      color: #059669;
    }

    .stat-change.negative {
      color: #dc2626;
    }

    .stat-change mat-icon {
      font-size: 1rem;
      margin-right: 4px;
    }

    .section-card {
      margin-bottom: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .popular-pages {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .page-item {
      display: flex;
      align-items: center;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }

    .page-rank {
      background: #3b82f6;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 15px;
    }

    .page-info {
      flex: 1;
    }

    .page-info h4 {
      margin: 0 0 5px 0;
      color: #1f2937;
    }

    .page-info p {
      margin: 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .page-views {
      text-align: right;
      min-width: 100px;
    }

    .page-views mat-progress-bar {
      margin-bottom: 5px;
    }

    .page-views span {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .traffic-sources {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .source-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }

    .source-info {
      display: flex;
      align-items: center;
    }

    .source-icon {
      font-size: 1.5rem;
      margin-right: 15px;
    }

    .source-details h4 {
      margin: 0 0 5px 0;
      color: #1f2937;
    }

    .source-details p {
      margin: 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .source-percentage {
      text-align: right;
      min-width: 100px;
    }

    .source-percentage mat-progress-bar {
      margin-bottom: 5px;
    }

    .source-percentage span {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .realtime-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
    }

    .realtime-item {
      text-align: center;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }

    .realtime-number {
      font-size: 2rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 5px;
    }

    .realtime-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .traffic-dashboard {
        padding: 15px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .realtime-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TrafficDashboardComponent implements OnInit, OnDestroy {
  // Sample data - replace with real analytics data
  totalPageViews = 15420;
  uniqueVisitors = 8234;
  averageSessionDuration = '2m 34s';
  bounceRate = 42.3;

  pageViewsGrowth = 12.5;
  visitorsGrowth = 8.7;
  sessionGrowth = 15.2;
  bounceRateChange = 5.1;

  popularPages = [
    { title: 'Home Page', views: 5420, percentage: 35 },
    { title: 'Technology News', views: 3240, percentage: 21 },
    { title: 'Breaking News', views: 2180, percentage: 14 },
    { title: 'Politics Section', views: 1890, percentage: 12 },
    { title: 'Sports News', views: 1560, percentage: 10 }
  ];

  trafficSources = [
    { name: 'Direct', icon: '🏠', visitors: 4120, percentage: 50, color: 'primary' },
    { name: 'Google Search', icon: '🔍', visitors: 2460, percentage: 30, color: 'accent' },
    { name: 'Social Media', icon: '📱', visitors: 1230, percentage: 15, color: 'warn' },
    { name: 'Referral', icon: '🔗', visitors: 424, percentage: 5, color: 'primary' }
  ];

  realtimeVisitors = 23;
  todayVisitors = 1247;
  thisWeekVisitors = 8234;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Initialize real-time tracking
    this.startRealtimeTracking();
  }

  ngOnDestroy() {
    // Cleanup tracking
  }

  private startRealtimeTracking() {
    // Simulate real-time updates
    setInterval(() => {
      this.realtimeVisitors = Math.floor(Math.random() * 50) + 10;
    }, 30000); // Update every 30 seconds
  }
} 