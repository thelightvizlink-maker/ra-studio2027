# RA Studio Portal - Deployment Guide

## 📋 Project Status (Updated: 2025-12-28)

### ✅ Completed Tasks
1. **Repository Setup**
   - Deleted duplicate `ra-studio-portal-main` folder
   - Initialized Git repository
   - Connected to GitHub: https://github.com/thelightvizlink-maker/ra-studio2027

2. **Branding Cleanup**
   - Removed all Lovable.dev references
   - Updated project name to "ra-studio-portal"
   - Replaced favicon with custom RA Studio PNG
   - Updated meta tags and Open Graph images

3. **GitHub Pages Deployment** ✅ LIVE
   - Configured Vite with base path for GitHub Pages
   - Created GitHub Actions workflow for auto-deployment
   - Fixed React Router basename for proper routing
   - **Live URL:** https://thelightvizlink-maker.github.io/ra-studio2027/
   - Status: ✅ Working (all pages load correctly, custom favicon displays)

### ⏳ In Progress
4. **Vercel Deployment**
   - Status: Ready to deploy
   - Next: Import repository to Vercel
   - Next: Connect custom domain from Cloudflare

---

## 🚀 Vercel Deployment Steps (Continue Here)

### Step 1: Import to Vercel
1. Go to https://vercel.com/login
2. Sign in with GitHub (use thelightvizlink-maker account)
3. Click "Add New..." → "Project"
4. Select repository: `thelightvizlink-maker/ra-studio2027`
5. Click "Import"

### Step 2: Configure Project
```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 3: Deploy
- Click "Deploy" button
- Wait 2-3 minutes for first deployment
- You'll get a URL like: `ra-studio2027.vercel.app`

### Step 4: Connect Custom Domain (from Cloudflare)

#### In Vercel:
1. Go to your project settings
2. Click "Domains" tab
3. Add your custom domain (e.g., `rastudio.com` or `www.rastudio.com`)
4. Vercel will show DNS records you need to add

#### In Cloudflare:
1. Go to your Cloudflare dashboard
2. Select your domain
3. Go to DNS settings
4. Add the records Vercel provides:

**For root domain (example.com):**
```
Type: A
Name: @
Value: 76.76.21.21
Proxy: Off (DNS Only)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
Proxy: Off (DNS Only)
```

5. Save and wait 5-10 minutes for DNS propagation

#### Back in Vercel:
1. Click "Verify" on your domain
2. Once verified, your site is live on your custom domain!

---

## 🔧 Important Configuration Files

### vite.config.ts
- Base path configured for GitHub Pages: `/ra-studio2027/`
- For Vercel: Uses `/` (root path)

### .github/workflows/deploy.yml
- Auto-deploys to GitHub Pages on push to `main`
- Builds with `npm run build`
- Deploys `dist` folder

### index.html
- Custom favicon: `/favicon.png`
- Updated meta tags for RA Studio branding
- Open Graph images set to `/og-image.png` (TODO: add actual image)

---

## 📝 TODO Items

1. **Vercel Deployment**
   - [ ] Import repository to Vercel
   - [ ] Configure build settings
   - [ ] Deploy to Vercel
   - [ ] Connect custom domain
   - [ ] Configure Cloudflare DNS

2. **Optional Enhancements**
   - [ ] Add Open Graph image (1200x630px) as `/public/og-image.png`
   - [ ] Optimize favicon.png (currently 3.6MB - should be smaller)
   - [ ] Add custom 404 page
   - [ ] Set up environment variables if needed
   - [ ] Configure analytics (Google Analytics, Vercel Analytics, etc.)

3. **Custom Domain Setup**
   - [ ] Decide which domain to use (user has 4 on Cloudflare)
   - [ ] Configure DNS records in Cloudflare
   - [ ] Enable SSL certificate in Vercel
   - [ ] Test domain propagation

---

## 🌍 Current URLs

- **GitHub Pages:** https://thelightvizlink-maker.github.io/ra-studio2027/
- **Repository:** https://github.com/thelightvizlink-maker/ra-studio2027
- **Vercel:** (To be deployed)
- **Custom Domain:** (To be configured)

---

## 📞 Support & Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Cloudflare DNS Guide:** https://developers.cloudflare.com/dns/
- **GitHub Pages:** https://docs.github.com/en/pages
- **Vite Docs:** https://vitejs.dev/guide/

---

## 🔄 Session Resume Checklist

When you resume:
1. [ ] Verify GitHub Pages is still working
2. [ ] Start Vercel deployment (follow Step 1 above)
3. [ ] Provide custom domain name for configuration
4. [ ] Configure Cloudflare DNS records
5. [ ] Test and verify deployment

---

**Last Updated:** 2025-12-28
**Status:** Ready for Vercel deployment
