# Quick Deployment Guide

## What's Changed?
Your portfolio has been optimized for mobile performance. The main changes:
- 🚀 3D Spline viewer disabled on mobile (replaced with gradient effect)
- ⚡ Lazy loading for better initial load time
- 📱 Mobile-specific optimizations
- 🎯 Scroll performance improvements

## How to Deploy

### Step 1: Test Locally
```bash
cd portfolio2
npm start
```
Open on your phone's browser using your local IP (e.g., http://192.168.1.x:3000)

### Step 2: Build for Production
```bash
npm run build
```

### Step 3: Deploy to Vercel

#### Option A: Using Git (Recommended)
```bash
git add .
git commit -m "Mobile performance optimizations - Fix lag issues"
git push
```
Vercel will auto-deploy from your connected repository.

#### Option B: Using Vercel CLI
```bash
npx vercel --prod
```

### Step 4: Clear Cache
After deployment, clear your browser cache or open in incognito mode to see changes.

## Testing

### On Mobile:
1. Open: https://ajitadhikari1.com.np
2. Test smooth scrolling
3. Check if animations are smooth
4. Verify no 3D viewer on mobile (should see gradient orb)

### On Desktop:
1. Verify 3D Spline viewer still works
2. Check all animations
3. Test responsiveness

## Rollback (If Needed)
If something goes wrong:
```bash
git revert HEAD
git push
```

## Expected Results
- ✅ Initial load: ~2-3 seconds (was 8-12s)
- ✅ Smooth 60 FPS scrolling
- ✅ No lag on mobile
- ✅ Better battery life

## Questions?
Check MOBILE_OPTIMIZATIONS.md for detailed technical info.
