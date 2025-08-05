import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
}

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="weather-widget" *ngIf="showWeather">
      <mat-card class="weather-card">
        <div class="weather-header">
          <div class="location-info">
            <mat-icon class="location-icon">location_on</mat-icon>
            <span class="location-name">{{ weatherData?.location || 'Loading...' }}</span>
          </div>
          <button mat-icon-button (click)="toggleWeather()" class="close-btn">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="weather-content" *ngIf="weatherData; else loading">
          <div class="main-weather">
            <div class="temperature-section">
              <div class="current-temp">
                <span class="temp-value">{{ weatherData.temperature }}°</span>
                <span class="temp-unit">C</span>
              </div>
              <div class="weather-icon">
                <mat-icon [class]="getWeatherIconClass(weatherData.icon)">
                  {{ getWeatherIcon(weatherData.icon) }}
                </mat-icon>
              </div>
            </div>
            <div class="weather-description">
              <h3>{{ weatherData.description }}</h3>
              <p class="feels-like">Feels like {{ weatherData.feelsLike }}°C</p>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail-item">
              <mat-icon>opacity</mat-icon>
              <span class="detail-label">Humidity</span>
              <span class="detail-value">{{ weatherData.humidity }}%</span>
            </div>
            <div class="detail-item">
              <mat-icon>air</mat-icon>
              <span class="detail-label">Wind</span>
              <span class="detail-value">{{ weatherData.windSpeed }} km/h</span>
            </div>
            <div class="detail-item">
              <mat-icon>compress</mat-icon>
              <span class="detail-label">Pressure</span>
              <span class="detail-value">{{ weatherData.pressure }} hPa</span>
            </div>
            <div class="detail-item">
              <mat-icon>visibility</mat-icon>
              <span class="detail-label">Visibility</span>
              <span class="detail-value">{{ weatherData.visibility }} km</span>
            </div>
          </div>

          <div class="weather-footer">
            <button mat-button (click)="refreshWeather()" class="refresh-btn">
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
            <span class="last-updated">Updated {{ getLastUpdated() }}</span>
          </div>
        </div>

        <ng-template #loading>
          <div class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Getting weather data...</p>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `,
  styles: [`
    .weather-widget {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
      max-width: 320px;
      min-width: 280px;
    }

    .weather-card {
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .weather-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 0 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .location-icon {
      color: #3b82f6;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .location-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
    }

    .close-btn {
      color: #6b7280;
    }

    .weather-content {
      padding: 16px;
    }

    .main-weather {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .temperature-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .current-temp {
      display: flex;
      align-items: baseline;
    }

    .temp-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      line-height: 1;
    }

    .temp-unit {
      font-size: 1.2rem;
      font-weight: 600;
      color: #6b7280;
      margin-left: 4px;
    }

    .weather-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
    }

    .weather-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: white;
    }

    .weather-description {
      text-align: right;
    }

    .weather-description h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      text-transform: capitalize;
    }

    .feels-like {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
    }

    .weather-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 8px;
    }

    .detail-item mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #3b82f6;
    }

    .detail-label {
      font-size: 12px;
      color: #6b7280;
      flex: 1;
    }

    .detail-value {
      font-size: 12px;
      font-weight: 600;
      color: #1f2937;
    }

    .weather-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .refresh-btn {
      color: #3b82f6;
      font-size: 12px;
    }

    .refresh-btn mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .last-updated {
      font-size: 11px;
      color: #9ca3af;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 20px;
    }

    .loading-container p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }

    /* Weather icon classes */
    .weather-sunny { color: #f59e0b; }
    .weather-cloudy { color: #6b7280; }
    .weather-rainy { color: #3b82f6; }
    .weather-snowy { color: #8b5cf6; }
    .weather-stormy { color: #dc2626; }

    @media (max-width: 768px) {
      .weather-widget {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        right: auto;
        max-width: 90vw;
      }
    }
  `]
})
export class WeatherWidgetComponent implements OnInit, OnDestroy {
  @Input() showWeather = false;
  @Output() weatherToggle = new EventEmitter<boolean>();
  @Output() weatherDataUpdate = new EventEmitter<WeatherData>();
  
  weatherData: WeatherData | null = null;
  isLoading = false;
  lastUpdated: Date | null = null;
  private locationWatchId: number | null = null;

  ngOnInit() {
    this.getUserLocation();
  }

  ngOnDestroy() {
    if (this.locationWatchId) {
      navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  toggleWeather() {
    this.showWeather = !this.showWeather;
    this.weatherToggle.emit(this.showWeather);
    if (this.showWeather && !this.weatherData) {
      this.getUserLocation();
    }
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          this.isLoading = false;
          // Fallback to a default location (New Delhi)
          this.fetchWeatherData(28.6139, 77.2090);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      this.isLoading = false;
    }
  }

  private async fetchWeatherData(lat: number, lon: number) {
    try {
      // Using OpenWeatherMap API (you'll need to get a free API key)
      const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      
      // For demo purposes, using mock data
      this.weatherData = this.getMockWeatherData();
      this.lastUpdated = new Date();
      this.isLoading = false;
      
      // Emit weather data to parent component
      if (this.weatherData) {
        this.weatherDataUpdate.emit(this.weatherData);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.isLoading = false;
    }
  }

  private getMockWeatherData(): WeatherData {
    const weatherConditions = [
      { description: 'Sunny', icon: 'wb_sunny', temp: 28, feelsLike: 30 },
      { description: 'Partly Cloudy', icon: 'cloud', temp: 24, feelsLike: 26 },
      { description: 'Rainy', icon: 'grain', temp: 18, feelsLike: 20 },
      { description: 'Cloudy', icon: 'cloud', temp: 22, feelsLike: 24 }
    ];

    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    return {
      location: 'Your Location',
      temperature: randomWeather.temp,
      description: randomWeather.description,
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: randomWeather.icon,
      feelsLike: randomWeather.feelsLike,
      pressure: Math.floor(Math.random() * 50) + 1000,
      visibility: Math.floor(Math.random() * 5) + 5
    };
  }

  refreshWeather() {
    this.getUserLocation();
  }

  getWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      'wb_sunny': 'wb_sunny',
      'cloud': 'cloud',
      'grain': 'grain',
      'ac_unit': 'ac_unit',
      'thunderstorm': 'thunderstorm'
    };
    return iconMap[iconCode] || 'wb_sunny';
  }

  getWeatherIconClass(iconCode: string): string {
    const classMap: { [key: string]: string } = {
      'wb_sunny': 'weather-sunny',
      'cloud': 'weather-cloudy',
      'grain': 'weather-rainy',
      'ac_unit': 'weather-snowy',
      'thunderstorm': 'weather-stormy'
    };
    return classMap[iconCode] || 'weather-sunny';
  }

  getLastUpdated(): string {
    if (!this.lastUpdated) return '';
    const now = new Date();
    const diff = Math.floor((now.getTime() - this.lastUpdated.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  }
} 