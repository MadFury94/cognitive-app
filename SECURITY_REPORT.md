# Security Vulnerability Report

## CRITICAL Issues (Fix Immediately)

### 1. Hardcoded Credentials in Client-Side Code
**File:** `app/admin/login/page.tsx`
**Risk:** CRITICAL - Password exposed in browser source code
- `NEXT_PUBLIC_` env vars are bundled into the browser JS
- Anyone can open DevTools and read the password
- Default fallback `'Quickflow@2026'` hardcoded in source

### 2. Hardcoded API Token
**Files:** `app/admin/dashboard/page.tsx`, `workers/index.ts`
**Risk:** CRITICAL - `'Bearer admin-token-here'` is a static, guessable token
- Anyone who reads the source can call your API directly
- No real authentication on the Cloudflare Worker

### 3. CORS Wildcard on Worker API
**File:** `workers/index.ts`
**Risk:** HIGH - `'Access-Control-Allow-Origin': '*'`
- Any website on the internet can call your API
- Should be restricted to your domain only

### 4. Booking Form Does Nothing
**File:** `components/booking/BookingForm.tsx`
**Risk:** HIGH - Form submissions are silently dropped (`console.log` only)
- No data is saved, no email sent
- Parents think they booked but nothing happens

### 5. No Security Headers
**File:** `next.config.ts`
**Risk:** MEDIUM - Missing CSP, X-Frame-Options, etc.
- Vulnerable to clickjacking, XSS, MIME sniffing

### 6. Database ID Exposed
**File:** `wrangler.toml`
**Risk:** LOW-MEDIUM - D1 database ID in source control
- Should be in environment variables, not committed to git

## Dependency Vulnerabilities
- `postcss < 8.5.10` - XSS via unescaped `</style>` in CSS output (MODERATE)
