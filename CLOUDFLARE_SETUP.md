# Cloudflare Backend Setup Guide

## Overview
This guide will help you set up a Cloudflare-based backend for managing programs, blog posts, and bookings.

## Architecture
- **Cloudflare D1**: SQLite database for storing data
- **Cloudflare Workers**: API endpoints
- **Cloudflare Pages**: Host Next.js application
- **Cloudflare R2** (optional): Image storage

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

## Step 2: Create D1 Database

```bash
# Create database
wrangler d1 create cogniskills-db

# This will output a database ID - save it!
```

## Step 3: Update wrangler.toml

Create `wrangler.toml` in your project root with the database ID from step 2.

## Step 4: Initialize Database Schema

```bash
# Run the schema migration
wrangler d1 execute cogniskills-db --file=./db/schema.sql
```

## Step 5: Set Up Environment Variables

Create `.dev.vars` file (for local development):
```
ADMIN_EMAIL=admin@cogniskillsleh.com
ADMIN_PASSWORD_HASH=your_hashed_password
JWT_SECRET=your_secret_key_here
```

For production, set these in Cloudflare Dashboard:
1. Go to Workers & Pages > Your Worker > Settings > Variables
2. Add the same variables as encrypted secrets

## Step 6: Deploy Workers

```bash
# Deploy API worker
wrangler deploy
```

## Step 7: Connect Next.js to Cloudflare

Update your Next.js API routes to call Cloudflare Workers endpoints.

## Step 8: Deploy to Cloudflare Pages

```bash
# Build your Next.js app
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next
```

## API Endpoints

Once deployed, your API will be available at:
- `https://your-worker.workers.dev/api/programs` - Manage programs
- `https://your-worker.workers.dev/api/blog` - Manage blog posts
- `https://your-worker.workers.dev/api/bookings` - Manage bookings
- `https://your-worker.workers.dev/api/auth/login` - Admin login

## Admin Panel Access

Access your admin panel at:
`https://your-site.com/admin`

Default credentials (change immediately):
- Email: admin@cogniskillsleh.com
- Password: (set during setup)

## Security Notes

1. Always use HTTPS
2. Change default admin credentials immediately
3. Use strong JWT secrets
4. Enable Cloudflare's security features (WAF, Rate Limiting)
5. Regularly backup your D1 database

## Backup Database

```bash
# Export database
wrangler d1 export cogniskills-db --output=backup.sql
```

## Useful Commands

```bash
# View database
wrangler d1 execute cogniskills-db --command="SELECT * FROM programs"

# Local development
wrangler dev

# View logs
wrangler tail
```
