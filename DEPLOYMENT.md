# Deployment Guide for Okappi Digital Website

This guide will help you deploy your website to a custom domain.

## Prerequisites

- A domain name registered
- A hosting provider (see options below)
- DNS access for your domain

## Quick Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository: `brad-jeancy/OkappiDigital`
4. Vercel will auto-detect settings (already configured in `vercel.json`)
5. Click "Deploy"
6. Add your custom domain:
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS instructions

### Option 2: Netlify (Free)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
5. Click "Deploy site"
6. Add custom domain:
   - Go to Site Settings → Domain Management
   - Add your domain
   - Follow DNS instructions

### Option 3: Traditional Web Hosting (cPanel, etc.)

1. Upload all files to your hosting's `public_html` or `www` folder
2. Ensure `.htaccess` file is uploaded (for Apache servers)
3. Point your domain's A record or CNAME to your hosting provider
4. Wait for DNS propagation (24-48 hours)

## DNS Configuration

### For Vercel/Netlify:
- Add a CNAME record pointing to: `cname.vercel-dns.com` (Vercel) or `your-site.netlify.app` (Netlify)

### For Traditional Hosting:
- Add an A record pointing to your server's IP address
- Or add a CNAME record if your host provides one

## Before Going Live Checklist

- [ ] Update `sitemap.xml` with your actual domain
- [ ] Update `robots.txt` with your actual domain
- [ ] Configure EmailJS with your credentials (see `EMAILJS_SETUP.md`)
- [ ] Test contact form functionality
- [ ] Test on mobile devices
- [ ] Enable HTTPS/SSL certificate (most hosts do this automatically)
- [ ] Update any hardcoded URLs if needed

## Post-Deployment

1. **Test your website**: Visit your domain and test all features
2. **Submit to Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
3. **Submit sitemap**: In Google Search Console, submit your sitemap URL
4. **Monitor**: Check analytics and form submissions

## File Structure

```
Website/
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css   # All styles
│   └── js/
│       └── script.js   # All JavaScript
├── .htaccess          # Apache configuration
├── robots.txt         # Search engine instructions
├── sitemap.xml        # Site structure for search engines
├── vercel.json        # Vercel deployment config
├── netlify.toml       # Netlify deployment config
└── README.md          # Project documentation
```

## Support

For hosting-specific issues, contact your hosting provider's support.

