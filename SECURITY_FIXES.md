# Security Fixes Applied

## What Was Fixed

### ✅ 1. Admin credentials moved server-side
- Created `app/api/admin/login/route.ts` — credentials checked on server only
- Removed `NEXT_PUBLIC_` env vars (which expose secrets to the browser)
- Admin login now calls `/api/admin/login` instead of comparing in the browser
- Timing-safe response (300ms delay on failure) prevents brute-force timing attacks

### ✅ 2. Hardcoded token replaced with env variable
- Worker now reads `ADMIN_TOKEN` from Cloudflare secret (not hardcoded)
- `isAuthorized()` helper centralises auth checks

### ✅ 3. CORS restricted to your domain
- Worker CORS now uses `ALLOWED_ORIGIN` env variable
- No more wildcard `*` — only your domain can call the API

### ✅ 4. Booking form now works
- Created `app/api/booking/route.ts` with input sanitisation and validation
- Form shows success/error states
- Submissions forwarded to Cloudflare Worker

### ✅ 5. Security headers added
- `X-Frame-Options: SAMEORIGIN` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Strict-Transport-Security` — forces HTTPS
- `Referrer-Policy` — controls referrer leakage
- `Permissions-Policy` — disables camera/mic/geolocation
- `X-XSS-Protection` — legacy XSS protection

### ✅ 6. .env.example created
- Template for required environment variables
- `.env.local` already in `.gitignore`

---

## Action Required (Manual Steps)

### Step 1: Create .env.local
```bash
cp .env.example .env.local
# Then edit .env.local with real values
```

### Step 2: Set Cloudflare Worker Secrets
```bash
# Run these commands to set secrets in Cloudflare (not in wrangler.toml)
wrangler secret put ADMIN_TOKEN
wrangler secret put ALLOWED_ORIGIN
```

### Step 3: Fix postcss vulnerability
```bash
npm audit fix
```

### Step 4: Change your admin password
- Use a strong, unique password (16+ characters)
- Use a random string for ADMIN_TOKEN (e.g. `openssl rand -hex 32`)

### Step 5: Add wrangler.toml database_id to secrets
Consider moving the database_id out of wrangler.toml if the repo is public.

---

## Remaining Recommendations

| Issue | Priority | Action |
|-------|----------|--------|
| No rate limiting on login | HIGH | Add middleware rate limiting |
| localStorage for admin token | MEDIUM | Consider httpOnly cookie instead |
| No email on booking | HIGH | Integrate Resend or SendGrid |
| Admin token never expires | MEDIUM | Add JWT with expiry |
| No CAPTCHA on forms | MEDIUM | Add Cloudflare Turnstile |
