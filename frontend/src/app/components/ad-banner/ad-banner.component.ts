import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-banner" [class]="position">
      <div class="ad-content">
        <!-- Google AdSense Ad Unit -->
        <ins class="adsbygoogle"
             [style.display]="'block'"
             data-ad-client="ca-pub-3606261869291377"
             [attr.data-ad-slot]="getAdSlot()"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
      </div>
    </div>
  `,
  styles: [`
    .ad-banner {
      background: transparent;
      border: none;
      margin: 20px 0;
      overflow: hidden;
      text-align: center;
    }

    .ad-content {
      padding: 10px;
      text-align: center;
    }



    /* Responsive sizes */
    .ad-banner.sidebar {
      min-height: 250px;
    }

    .ad-banner.leaderboard {
      min-height: 90px;
    }

    .ad-banner.rectangle {
      min-height: 250px;
    }

    .ad-banner.square {
      min-height: 300px;
      max-width: 300px;
      margin: 20px auto;
    }

    .ad-banner.mobile {
      min-height: 100px;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .ad-banner {
        margin: 15px 0;
      }
      
      .ad-content {
        padding: 5px;
      }
    }
  `]
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() position: 'sidebar' | 'leaderboard' | 'rectangle' | 'square' | 'mobile' = 'rectangle';
  @Input() size: string = '300x250';

  ngOnInit() {
    // Load Google AdSense script if not already loaded
    this.loadAdSenseScript();
    
    // Initialize the ad after a short delay to ensure the DOM is ready
    setTimeout(() => {
      this.initializeAd();
    }, 100);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  getAdSlot(): string {
    // You'll need to create different ad slots in your AdSense account
    // and replace these with your actual ad slot IDs
    const slots = {
      sidebar: 'your-sidebar-ad-slot-id',
      leaderboard: 'your-leaderboard-ad-slot-id',
      rectangle: 'your-rectangle-ad-slot-id',
      square: 'your-square-ad-slot-id',
      mobile: 'your-mobile-ad-slot-id'
    };
    return slots[this.position] || slots.rectangle;
  }



  private loadAdSenseScript() {
    // Check if AdSense script is already loaded
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3606261869291377';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }

  private initializeAd() {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error initializing AdSense ad:', error);
      }
    }
  }

  get displaySize(): string {
    const sizes = {
      sidebar: '300x600',
      leaderboard: '728x90',
      rectangle: '300x250',
      square: '300x300',
      mobile: '320x100'
    };
    return sizes[this.position] || this.size;
  }
} 