import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private router: Router) {
    this.initializeRouteTracking();
  }

  /**
   * Initialize route change tracking
   */
  private initializeRouteTracking() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.trackPageView(event.urlAfterRedirects);
    });
  }

  /**
   * Track page views
   */
  trackPageView(pagePath: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-QCS0LN0073', {
        page_path: pagePath
      });
    }
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, parameters: { [key: string]: any } = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }

  /**
   * Track article views
   */
  trackArticleView(articleTitle: string, articleId: string, category: string) {
    this.trackEvent('article_view', {
      article_title: articleTitle,
      article_id: articleId,
      category: category,
      content_type: 'article'
    });
  }

  /**
   * Track user engagement
   */
  trackUserEngagement(action: string, content: string) {
    this.trackEvent('user_engagement', {
      action: action,
      content: content,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track search queries
   */
  trackSearch(searchTerm: string, resultsCount: number) {
    this.trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }

  /**
   * Track category clicks
   */
  trackCategoryClick(categoryName: string) {
    this.trackEvent('category_click', {
      category_name: categoryName
    });
  }

  /**
   * Track social media clicks
   */
  trackSocialClick(platform: string) {
    this.trackEvent('social_click', {
      platform: platform
    });
  }

  /**
   * Track newsletter signup
   */
  trackNewsletterSignup(email: string) {
    this.trackEvent('newsletter_signup', {
      email_domain: email.split('@')[1] // Only track domain for privacy
    });
  }

  /**
   * Track language toggle
   */
  trackLanguageToggle(language: string) {
    this.trackEvent('language_toggle', {
      language: language
    });
  }

  /**
   * Track time spent on page
   */
  trackTimeOnPage(pagePath: string, timeSpent: number) {
    this.trackEvent('time_on_page', {
      page_path: pagePath,
      time_spent_seconds: timeSpent
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(pagePath: string, scrollPercentage: number) {
    this.trackEvent('scroll_depth', {
      page_path: pagePath,
      scroll_percentage: scrollPercentage
    });
  }
} 