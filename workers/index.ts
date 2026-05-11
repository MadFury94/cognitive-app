export interface Env {
    DB: D1Database;
    ADMIN_TOKEN: string;
    ALLOWED_ORIGIN: string;
}

function getCorsHeaders(origin: string | null, allowedOrigin: string) {
    const allowed = origin === allowedOrigin ? origin : allowedOrigin;
    return {
        'Access-Control-Allow-Origin': allowed,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

function handleOptions(origin: string | null, allowedOrigin: string) {
    return new Response(null, {
        headers: getCorsHeaders(origin, allowedOrigin),
    });
}

function jsonResponse(data: any, status = 200, corsHeaders: Record<string, string>) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
}

function isAuthorized(request: Request, env: Env): boolean {
    const authHeader = request.headers.get('Authorization');
    return authHeader === `Bearer ${env.ADMIN_TOKEN}`;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get('Origin');
        const allowedOrigin = env.ALLOWED_ORIGIN || 'https://cogniskillsleh.com';
        const cors = getCorsHeaders(origin, allowedOrigin);

        if (request.method === 'OPTIONS') return handleOptions(origin, allowedOrigin);

        const url = new URL(request.url);
        const path = url.pathname;

        try {

            // ── Programs ──────────────────────────────────────────────────────

            if (path === '/api/programs' && request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    'SELECT * FROM programs WHERE is_active = 1 ORDER BY id'
                ).all();
                return jsonResponse(results, 200, cors);
            }

            if (path.startsWith('/api/programs/') && request.method === 'GET') {
                const slug = path.split('/')[3];
                const { results } = await env.DB.prepare(
                    'SELECT * FROM programs WHERE slug = ? AND is_active = 1'
                ).bind(slug).all();
                if (results.length === 0) return jsonResponse({ error: 'Not found' }, 404, cors);
                return jsonResponse(results[0], 200, cors);
            }

            if (path.startsWith('/api/programs/') && request.method === 'PUT') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                const data = await request.json() as any;
                await env.DB.prepare(
                    `UPDATE programs SET title=?, description=?, duration=?,
                     sessions_per_week=?, improvement_stat=?, improvement_label=?,
                     updated_at=CURRENT_TIMESTAMP WHERE id=?`
                ).bind(data.title, data.description, data.duration,
                    data.sessions_per_week, data.improvement_stat, data.improvement_label, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            // ── Testimonials ──────────────────────────────────────────────────

            if (path === '/api/testimonials' && request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order, id'
                ).all();
                return jsonResponse(results, 200, cors);
            }

            if (path === '/api/testimonials' && request.method === 'POST') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const data = await request.json() as any;
                const result = await env.DB.prepare(
                    `INSERT INTO testimonials (name, role, content, rating, image_url, display_order)
                     VALUES (?, ?, ?, ?, ?, ?)`
                ).bind(data.name, data.role, data.content, data.rating || 5,
                    data.image_url || null, data.display_order || 0).run();
                return jsonResponse({ success: true, id: result.meta.last_row_id }, 200, cors);
            }

            if (path.startsWith('/api/testimonials/') && request.method === 'PUT') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                const data = await request.json() as any;
                await env.DB.prepare(
                    `UPDATE testimonials SET name=?, role=?, content=?, rating=?,
                     image_url=?, display_order=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
                ).bind(data.name, data.role, data.content, data.rating,
                    data.image_url, data.display_order, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            if (path.startsWith('/api/testimonials/') && request.method === 'DELETE') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                await env.DB.prepare('UPDATE testimonials SET is_active=0 WHERE id=?').bind(id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            // ── Team ──────────────────────────────────────────────────────────

            if (path === '/api/team' && request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    'SELECT * FROM team_members WHERE is_active = 1 ORDER BY display_order, id'
                ).all();
                return jsonResponse(results, 200, cors);
            }

            if (path === '/api/team' && request.method === 'POST') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const data = await request.json() as any;
                const result = await env.DB.prepare(
                    `INSERT INTO team_members (name, role, initials, image_url, display_order)
                     VALUES (?, ?, ?, ?, ?)`
                ).bind(data.name, data.role, data.initials,
                    data.image_url || null, data.display_order || 0).run();
                return jsonResponse({ success: true, id: result.meta.last_row_id }, 200, cors);
            }

            if (path.startsWith('/api/team/') && request.method === 'PUT') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                const data = await request.json() as any;
                await env.DB.prepare(
                    `UPDATE team_members SET name=?, role=?, initials=?, image_url=?,
                     display_order=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
                ).bind(data.name, data.role, data.initials,
                    data.image_url, data.display_order, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            if (path.startsWith('/api/team/') && request.method === 'DELETE') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                await env.DB.prepare('UPDATE team_members SET is_active=0 WHERE id=?').bind(id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            // ── Blog Posts ────────────────────────────────────────────────────

            // GET /api/blog — all published posts (public)
            if (path === '/api/blog' && request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    `SELECT id, slug, title, excerpt, author, category, cover_image,
                     published_at, created_at FROM blog_posts
                     WHERE is_published = 1 AND is_active = 1
                     ORDER BY published_at DESC, id DESC`
                ).all();
                return jsonResponse(results, 200, cors);
            }

            // GET /api/blog/all — all posts including drafts (admin)
            if (path === '/api/blog/all' && request.method === 'GET') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const { results } = await env.DB.prepare(
                    `SELECT id, slug, title, excerpt, author, category, cover_image,
                     is_published, published_at, created_at FROM blog_posts
                     WHERE is_active = 1 ORDER BY created_at DESC`
                ).all();
                return jsonResponse(results, 200, cors);
            }

            // GET /api/blog/:slug — single post by slug (public)
            if (path.startsWith('/api/blog/') && request.method === 'GET') {
                const slug = path.split('/')[3];
                if (slug === 'all') return jsonResponse({ error: 'Not found' }, 404, cors);
                const { results } = await env.DB.prepare(
                    `SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1 AND is_active = 1`
                ).bind(slug).all();
                if (results.length === 0) return jsonResponse({ error: 'Not found' }, 404, cors);
                return jsonResponse(results[0], 200, cors);
            }

            // POST /api/blog — create post (admin)
            if (path === '/api/blog' && request.method === 'POST') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const data = await request.json() as any;
                const slug = data.slug || data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
                const result = await env.DB.prepare(
                    `INSERT INTO blog_posts
                     (slug, title, excerpt, content, author, category, cover_image, is_published, published_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
                ).bind(
                    slug, data.title, data.excerpt, data.content,
                    data.author || 'Cogniskills Team',
                    data.category || 'General',
                    data.cover_image || null,
                    data.is_published ? 1 : 0,
                    data.is_published ? new Date().toISOString() : null
                ).run();
                return jsonResponse({ success: true, id: result.meta.last_row_id, slug }, 200, cors);
            }

            // PUT /api/blog/:id — update post (admin)
            if (path.startsWith('/api/blog/') && request.method === 'PUT') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                const data = await request.json() as any;
                // Set published_at when first publishing
                const publishedAt = data.is_published
                    ? (data.published_at || new Date().toISOString())
                    : null;
                await env.DB.prepare(
                    `UPDATE blog_posts SET title=?, excerpt=?, content=?, author=?, category=?,
                     cover_image=?, is_published=?, published_at=?, updated_at=CURRENT_TIMESTAMP
                     WHERE id=?`
                ).bind(
                    data.title, data.excerpt, data.content,
                    data.author, data.category, data.cover_image || null,
                    data.is_published ? 1 : 0, publishedAt, id
                ).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            // DELETE /api/blog/:id — soft delete (admin)
            if (path.startsWith('/api/blog/') && request.method === 'DELETE') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                await env.DB.prepare('UPDATE blog_posts SET is_active=0 WHERE id=?').bind(id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            // ── Bookings ──────────────────────────────────────────────────────

            if (path === '/api/bookings' && request.method === 'POST') {
                return jsonResponse({
                    success: true,
                    message: 'Booking received. We will contact you within 24 hours.'
                }, 200, cors);
            }

            return jsonResponse({ error: 'Not found' }, 404, cors);

        } catch (error: any) {
            console.error('Worker error:', error);
            return jsonResponse({ error: 'Internal server error' }, 500, cors);
        }
    },
};
