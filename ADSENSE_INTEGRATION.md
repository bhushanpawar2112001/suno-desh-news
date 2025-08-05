# Google AdSense Integration

## Overview

The NewsHub application has been updated to use Google AdSense instead of placeholder ads. The integration includes:

- Google AdSense script loaded globally in `index.html`
- Updated `AdBannerComponent` to display real AdSense ads
- Responsive ad placements throughout the application

## Implementation Details

### 1. Global AdSense Script

The Google AdSense script is loaded in `frontend/src/index.html`:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3606261869291377"
     crossorigin="anonymous"></script>
```

### 2. Ad Banner Component

The `AdBannerComponent` (`frontend/src/app/components/ad-banner/ad-banner.component.ts`) has been updated to:

- Display real AdSense ad units instead of placeholder content
- Automatically initialize AdSense ads when the component loads
- Support different ad positions and sizes

### 3. Ad Placements

The application includes ad placements in the following locations:

- **Sidebar**: 300x600 ads in the sidebar
- **Leaderboard**: 728x90 ads at the top of content sections
- **Mobile**: 320x100 ads for mobile devices
- **Rectangle**: 300x250 ads in content areas

## Setup Instructions

### 1. Create AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Create an account and get your publisher ID
3. Wait for account approval

### 2. Create Ad Units

In your AdSense dashboard, create the following ad units:

- **Sidebar Ad Unit**: 300x600 size
- **Leaderboard Ad Unit**: 728x90 size  
- **Rectangle Ad Unit**: 300x250 size
- **Mobile Ad Unit**: 320x100 size

### 3. Update Ad Slot IDs

Replace the placeholder ad slot IDs in `frontend/src/app/components/ad-banner/ad-banner.component.ts`:

```typescript
getAdSlot(): string {
  const slots = {
    sidebar: 'your-actual-sidebar-ad-slot-id',
    leaderboard: 'your-actual-leaderboard-ad-slot-id',
    rectangle: 'your-actual-rectangle-ad-slot-id',
    square: 'your-actual-square-ad-slot-id',
    mobile: 'your-actual-mobile-ad-slot-id'
  };
  return slots[this.position] || slots.rectangle;
}
```

### 4. Update Publisher ID

If you have a different publisher ID, update it in:

1. `frontend/src/index.html` (line with `ca-pub-3606261869291377`)
2. `frontend/src/app/components/ad-banner/ad-banner.component.ts` (in the `loadAdSenseScript` method)

## AdSense Policies

Make sure your website complies with AdSense policies:

- **Content**: Ensure your content is original and valuable
- **Traffic**: Build legitimate traffic to your site
- **Layout**: Follow AdSense layout policies
- **No Click Fraud**: Never click your own ads or encourage others to do so

## Testing

### Development Testing

During development, you may see:
- Empty ad spaces (normal for new AdSense accounts)
- Test ads (if your account is approved but not fully active)
- Placeholder content (if AdSense script fails to load)

### Production Testing

1. Deploy your application
2. Wait for AdSense to crawl your site
3. Monitor your AdSense dashboard for ad impressions
4. Check that ads are displaying correctly

## Troubleshooting

### Ads Not Showing

1. **Check AdSense Account Status**: Ensure your account is approved
2. **Verify Ad Slot IDs**: Make sure ad slot IDs are correct
3. **Check Console Errors**: Look for JavaScript errors in browser console
4. **Wait for Crawling**: AdSense may take time to crawl new pages

### Script Loading Issues

1. **Check Network**: Ensure the AdSense script can load
2. **Verify Publisher ID**: Check that the publisher ID is correct
3. **Clear Cache**: Clear browser cache and reload

### Responsive Issues

1. **Check CSS**: Ensure ad containers are properly sized
2. **Test Mobile**: Verify ads work on mobile devices
3. **Viewport**: Make sure viewport meta tag is set correctly

## Performance Considerations

- AdSense script is loaded asynchronously to not block page rendering
- Ads are initialized after component mounting to ensure proper DOM setup
- Error handling is included to prevent script failures from breaking the app

## Revenue Optimization

- **Ad Placement**: Strategic placement can improve click-through rates
- **Content Quality**: Better content attracts more valuable traffic
- **User Experience**: Balance ad revenue with user experience
- **Mobile Optimization**: Ensure ads work well on mobile devices

## Support

For AdSense-specific issues:
- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Community](https://support.google.com/adsense/community)

For application-specific issues:
- Check the application logs
- Review browser console for errors
- Verify ad slot configurations 