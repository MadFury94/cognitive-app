# Environment Variables Setup

## Files Created

### `.env.local` (Local Development - NOT committed to git)
Contains actual secrets for local development:
```env
NEXT_PUBLIC_API_URL=https://cogniskills-app.onochieazukaeme.workers.dev
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=Quickflow@2026
NEXT_PUBLIC_ADMIN_TOKEN=admin-token-here
```

### `.env.example` (Template - Committed to git)
Template for other developers:
```env
NEXT_PUBLIC_API_URL=https://your-worker.workers.dev
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_ADMIN_TOKEN=your-secure-token
```

## What Changed

### 1. Environment Variables
- API URL now comes from `NEXT_PUBLIC_API_URL`
- Admin credentials from `NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD`
- Admin token from `NEXT_PUBLIC_ADMIN_TOKEN`

### 2. API Helper (`lib/api.ts`)
Created centralized API helper with:
- `API_URL` - Gets URL from env variable
- `getAdminToken()` - Gets token from localStorage or env
- `api.getPrograms()` - Fetch programs
- `api.updateProgram()` - Update program
- `api.getTestimonials()` - Fetch testimonials
- `api.createTestimonial()` - Create testimonial
- `api.updateTestimonial()` - Update testimonial
- `api.deleteTestimonial()` - Delete testimonial

### 3. Admin Layout Separation
- Created `app/admin/layout.tsx` - Separate layout for admin pages
- Created `components/LayoutWrapper.tsx` - Conditionally shows header/footer
- Admin pages (`/admin/*`) now have NO main site header/footer
- Admin dashboard has its own header with "View Live Site" link

### 4. Updated Files
- `app/admin/login/page.tsx` - Uses env variables for credentials
- `app/admin/dashboard/page.tsx` - New admin header with live site link
- `app/admin/programs/[id]/page.tsx` - Updated header
- `app/layout.tsx` - Uses LayoutWrapper for conditional layout

## How to Use

### For Development
1. Copy `.env.example` to `.env.local`
2. Update values in `.env.local` with your actual credentials
3. Run `npm run dev`

### For Production (Cloudflare Pages)
1. Go to Cloudflare Pages dashboard
2. Settings → Environment Variables
3. Add these variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_ADMIN_USERNAME`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADMIN_TOKEN`

### For Production (Vercel)
1. Go to Vercel project settings
2. Environment Variables
3. Add the same variables as above

## Security Notes

### What's Better Now:
✅ Credentials not hardcoded in source code
✅ `.env.local` is gitignored (won't be committed)
✅ Different credentials per environment (dev/staging/prod)
✅ API URL can be changed without code changes

### Still Needs Improvement:
❌ Admin pages still accessible in production
❌ Token is still simple (not JWT)
❌ No rate limiting
❌ No session expiration
❌ NEXT_PUBLIC_* variables are exposed in browser bundle

### Future Improvements:
1. Use server-side API routes for admin operations
2. Implement proper JWT authentication
3. Add session management with expiration
4. Deploy admin to separate subdomain
5. Add rate limiting to prevent brute force
6. Use server-only environment variables (without NEXT_PUBLIC_)
