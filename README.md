# Glow Power Website

Production-ready commercial energy broker website for Glow Power (glowpower.co.uk).

## Quick Start

### File Structure
```
glowpower/
├── index.html                 # Homepage
├── services.html              # Services detail page
├── sectors.html               # Industry sectors page
├── about.html                 # About company page
├── contact.html               # Contact form page
├── privacy.html               # Privacy policy
├── blog/
│   ├── index.html            # Blog listing page
│   ├── uk-data-centre-energy-demand-2025.html
│   ├── commercial-energy-broker-uk-guide.html
│   └── industrial-energy-costs-uk-2025.html
├── css/
│   └── style.css             # All styling (minified)
├── js/
│   └── main.js               # All JavaScript (minified)
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Search engine directives
├── .htaccess                 # Apache configuration
└── README.md                 # This file
```

## Deployment Requirements

### Server Requirements
- Apache with `mod_rewrite` enabled (for clean URLs)
- PHP 7.0+ (optional - only if using backend features)
- Gzip compression support (configured in .htaccess)

### For Nginx
If using Nginx instead of Apache, use this configuration:

```nginx
server {
    listen 80;
    server_name glowpower.co.uk www.glowpower.co.uk;
    root /path/to/glowpower;
    index index.html;

    # Clean URLs - remove .html extension
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
    gzip_min_length 1000;

    # Cache control
    location ~* \.(css|js|jpg|jpeg|png|gif|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.html$ {
        expires 7d;
        add_header Cache-Control "public, must-revalidate";
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
}
```

## Configuration & Setup

### 1. Update Formspree Form ID

The contact and CTA forms use Formspree. Update the form action:

**Current**: `https://formspree.io/f/mxxxyyxx`

**Update to**: `https://formspree.io/f/YOUR_FORM_ID`

Steps:
1. Go to https://formspree.io
2. Create a new form
3. Replace `mxxxyyxx` with your form ID in:
   - `/index.html` (form in CTA section)
   - `/contact.html` (contact form)

### 2. Update Company Details

Replace placeholder text with actual company information:

**Files**: All HTML files

**Find & Replace**:
- `+44 (0) 20 XXXX XXXX` → Your actual phone number
- `hello@glowpower.co.uk` → Your actual email
- `15XXXXXX` → Your Companies House registration number
- `London, United Kingdom` → Your actual office address

### 3. Google Analytics (Optional)

To add Google Analytics, add this before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID.

### 4. SSL Certificate

Ensure your domain uses HTTPS:
- Get an SSL certificate (Let's Encrypt free option available)
- Configure your web server to redirect HTTP to HTTPS
- Update all URLs in meta tags from http:// to https://

### 5. DNS Setup

Point your domain to your hosting:
- `glowpower.co.uk` → Your hosting IP/CNAME
- `www.glowpower.co.uk` → Your hosting IP/CNAME

## Features

### Design
- ✅ Dark, premium aesthetic (deep navy + electric amber)
- ✅ Responsive mobile-first design
- ✅ Smooth hover animations on buttons, links, cards
- ✅ Sticky navigation
- ✅ SVG lightning bolt logo

### Performance
- ✅ Single minified CSS file (~13KB)
- ✅ Minimal JavaScript (~2KB)
- ✅ No external dependencies (except Google Fonts)
- ✅ Lazy loading ready for images
- ✅ Gzip compression configured
- ✅ Cache headers optimized
- ✅ Target: 95+ Lighthouse score

### SEO
- ✅ Sitemap.xml for search engines
- ✅ robots.txt with crawl directives
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags for social sharing
- ✅ Canonical URLs
- ✅ Schema markup (LocalBusiness, Organization, BlogPosting)
- ✅ H1-H3 proper hierarchy
- ✅ Homepage H1 contains "commercial energy broker UK"

### Content
- ✅ 6 main pages + 3 blog posts
- ✅ 1,200+ words of blog content (800-1,000 words per post)
- ✅ Professional copywriting (not salesy, expert tone)
- ✅ Commission transparency statements throughout
- ✅ Energy Ombudsman & Ofgem compliance messaging

### Compliance
- ✅ GDPR privacy policy
- ✅ Commission disclosure (Ofgem October 2024 compliant)
- ✅ Energy Ombudsman registration notices
- ✅ Company registration information
- ✅ Security headers configured (.htaccess)

## Forms

### Contact Form
- **Location**: `/contact.html` and `/index.html` (CTA section)
- **Fields**: Name, Company, Email, Phone, Annual Spend, Message
- **Integration**: Formspree (form ID needs updating)
- **Validation**: Client-side email and phone validation

## Blog System

The blog uses a flat-file HTML system (no database):

1. Each blog post is a standalone HTML file in `/blog/`
2. Blog index (`/blog/index.html`) lists all posts
3. Each post includes:
   - Proper H1/H2/H3 structure
   - Meta description & Open Graph tags
   - Author, date, category, read time
   - Related posts section
   - Schema markup (BlogPosting)
   - CTA at bottom

**To Add New Blog Posts**:
1. Create new HTML file: `/blog/post-url.html`
2. Copy structure from existing blog post
3. Update content, meta tags, schema markup
4. Add link to `/blog/index.html`
5. Update `/sitemap.xml`

## Styling

### CSS Architecture
- Single minified stylesheet: `/css/style.css` (~13KB)
- Mobile-first responsive design
- Color variables used throughout:
  - Primary background: #0A0F2C
  - Accent: #F5A623
  - Text: #FFFFFF
  - Secondary text: #8892A4
- Font: Inter from Google Fonts
- Animations: 200-300ms ease transitions

### Customizing Design
Edit `/css/style.css` to modify:
- Colors (search for hex values)
- Typography (font sizes, weights)
- Spacing (padding, margins, gaps)
- Animations (transition durations, transforms)

## JavaScript

### main.js Functionality
1. **Form Validation**: Email and phone validation
2. **Form Submission**: Formspree integration with success/error handling
3. **Lazy Loading**: Images with `data-src` attribute load on scroll
4. **Smooth Scroll**: Anchor link smooth scrolling

### To Add Lazy Loading to Images
Replace image src with data-src:
```html
<!-- Before -->
<img src="image.jpg" alt="Description">

<!-- After -->
<img data-src="image.jpg" alt="Description" loading="lazy">
```

## Performance Checklist

- [ ] Lighthouse score 95+
- [ ] Page load time < 2 seconds
- [ ] First Contentful Paint < 1.5s
- [ ] No render-blocking resources
- [ ] Gzip compression enabled
- [ ] Cache headers configured
- [ ] Images optimized (WebP with fallbacks)
- [ ] CSS minified (done)
- [ ] JavaScript minified (done)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Maintenance

### Monthly
- Check form submissions
- Monitor Google Analytics
- Review blog performance

### Quarterly
- Update blog with new content
- Review and update service descriptions
- Check for broken links (link checker tools)

### Annually
- Refresh blog content
- Update testimonials/case studies
- Review SEO performance
- Update privacy policy if needed

## Troubleshooting

### Forms Not Working
1. Check Formspree form ID is correct
2. Ensure form has `name` attributes on inputs
3. Check browser console for errors
4. Verify Formspree account is active

### Clean URLs Not Working
1. Verify Apache mod_rewrite is enabled
2. Check .htaccess permissions (644)
3. Check AllowOverride is set to All in Apache config
4. Test with direct file request: `/services.html` should work

### CSS/JS Not Loading
1. Check file paths are correct
2. Verify files exist on server
3. Check file permissions
4. Clear browser cache

## Support & Contact

For updates or modifications:
- Email: hello@glowpower.co.uk
- Phone: +44 (0) 20 XXXX XXXX

---

**Version**: 1.0
**Last Updated**: 25 February 2025
**Status**: Production Ready
