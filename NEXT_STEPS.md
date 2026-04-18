# Next Steps for Cogniskills Admin System

## ✅ What's Done

1. **Database Setup**
   - D1 database created: `cogniskills-db`
   - Programs table with 6 programs (Dyslexia, ADHD, Autism, Speech, Dyspraxia, Learning Delays)

2. **Worker API Deployed**
   - URL: https://cogniskills-app.onochieazukaeme.workers.dev
   - Endpoints:
     - `GET /api/programs` - Fetch all programs
     - `GET /api/programs/:slug` - Fetch single program
     - `PUT /api/programs/:id` - Update program (requires auth)
     - `POST /api/bookings` - Submit booking

3. **Admin Credentials**
   - Username: `admin`
   - Password: `Quickflow@2026`

## 🚧 What's Next

### 1. Update Frontend to Use API

Update `ProgramsSection.tsx` to fetch from Worker instead of hardcoded data:

```typescript
'use client';
import { useEffect, useState } from 'react';

export default function ProgramsSection() {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs')
            .then(res => res.json())
            .then(data => setPrograms(data));
    }, []);

    // Rest of component...
}
```

### 2. Create Admin Dashboard

Create `/app/admin/programs/page.tsx`:
- Login page with username/password
- List all programs
- Edit form for each program
- Save changes to database via Worker API

### 3. Add Blog System

Add to database schema:
```sql
CREATE TABLE blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Save Booking Submissions

Add to database schema:
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    child_age TEXT,
    program TEXT,
    preferred_date TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📝 Commands Reference

**Deploy Worker:**
```bash
wrangler deploy
```

**Update Database:**
```bash
wrangler d1 execute cogniskills-db --remote --file=./db/schema.sql
```

**Test API:**
```bash
curl https://cogniskills-app.onochieazukaeme.workers.dev/api/programs
```

## 🔐 Security Notes

- Current auth is basic (Bearer token)
- For production, implement proper JWT authentication
- Add rate limiting to prevent abuse
- Use environment variables for sensitive data

## 📚 Resources

- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
