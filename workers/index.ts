export interface Env {
    DB: D1Database;
    ADMIN_TOKEN: string;
    ALLOWED_ORIGIN: string;
}

// CORS headers — restricted to your domain only
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
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
        },
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

        if (request.method === 'OPTIONS') {
            return handleOptions(origin, allowedOrigin);
        }

        const url = new URL(request.url);
        const path = url.pathname;

        try {
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
                if (results.length === 0) return jsonResponse({ error: 'Program not found' }, 404, cors);
                return jsonResponse(results[0], 200, cors);
            }

            if (path.startsWith('/api/programs/') && request.method === 'PUT') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                const data = await request.json() as any;
                await env.DB.prepare(
                    `UPDATE programs SET title = ?, description = ?, duration = ?,
                     sessions_per_week = ?, improvement_stat = ?, improvement_label = ?,
                     updated_at = CURRENT_TIMESTAMP WHERE id = ?`
                ).bind(data.title, data.description, data.duration, data.sessions_per_week,
                    data.improvement_stat, data.improvement_label, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

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
                    `UPDATE testimonials SET name = ?, role = ?, content = ?, rating = ?,
                     image_url = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
                ).bind(data.name, data.role, data.content, data.rating,
                    data.image_url, data.display_order, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            if (path.startsWith('/api/testimonials/') && request.method === 'DELETE') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                await env.DB.prepare('UPDATE testimonials SET is_active = 0 WHERE id = ?').bind(id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

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
                    `UPDATE team_members SET name = ?, role = ?, initials = ?, image_url = ?,
                     display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
                ).bind(data.name, data.role, data.initials,
                    data.image_url, data.display_order, id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            if (path.startsWith('/api/team/') && request.method === 'DELETE') {
                if (!isAuthorized(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401, cors);
                const id = path.split('/')[3];
                await env.DB.prepare('UPDATE team_members SET is_active = 0 WHERE id = ?').bind(id).run();
                return jsonResponse({ success: true }, 200, cors);
            }

            if (path === '/api/bookings' && request.method === 'POST') {
                const data = await request.json() as any;
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

const url = new URL(request.url);
const path = url.pathname;

try {
    // GET /api/programs - Fetch all programs
    if (path === '/api/programs' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
            'SELECT * FROM programs WHERE is_active = 1 ORDER BY id'
        ).all();
        return jsonResponse(results);
    }

    // GET /api/programs/:slug - Fetch single program
    if (path.startsWith('/api/programs/') && request.method === 'GET') {
        const slug = path.split('/')[3];
        const { results } = await env.DB.prepare(
            'SELECT * FROM programs WHERE slug = ? AND is_active = 1'
        ).bind(slug).all();

        if (results.length === 0) {
            return jsonResponse({ error: 'Program not found' }, 404);
        }
        return jsonResponse(results[0]);
    }

    // PUT /api/programs/:id - Update program (admin only)
    if (path.startsWith('/api/programs/') && request.method === 'PUT') {
        const id = path.split('/')[3];
        const data = await request.json() as any;

        // Simple auth check - in production, use proper JWT
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        await env.DB.prepare(
            `UPDATE programs 
                     SET title = ?, description = ?, duration = ?, 
                         sessions_per_week = ?, improvement_stat = ?, 
                         improvement_label = ?, updated_at = CURRENT_TIMESTAMP
                     WHERE id = ?`
        ).bind(
            data.title,
            data.description,
            data.duration,
            data.sessions_per_week,
            data.improvement_stat,
            data.improvement_label,
            id
        ).run();

        return jsonResponse({ success: true, message: 'Program updated' });
    }

    // GET /api/testimonials - Fetch all testimonials
    if (path === '/api/testimonials' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
            'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order, id'
        ).all();
        return jsonResponse(results);
    }

    // POST /api/testimonials - Create testimonial (admin only)
    if (path === '/api/testimonials' && request.method === 'POST') {
        const data = await request.json() as any;

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        const result = await env.DB.prepare(
            `INSERT INTO testimonials (name, role, content, rating, image_url, display_order)
                     VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(
            data.name,
            data.role,
            data.content,
            data.rating || 5,
            data.image_url || null,
            data.display_order || 0
        ).run();

        return jsonResponse({ success: true, id: result.meta.last_row_id });
    }

    // PUT /api/testimonials/:id - Update testimonial (admin only)
    if (path.startsWith('/api/testimonials/') && request.method === 'PUT') {
        const id = path.split('/')[3];
        const data = await request.json() as any;

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        await env.DB.prepare(
            `UPDATE testimonials 
                     SET name = ?, role = ?, content = ?, rating = ?, 
                         image_url = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP
                     WHERE id = ?`
        ).bind(
            data.name,
            data.role,
            data.content,
            data.rating,
            data.image_url,
            data.display_order,
            id
        ).run();

        return jsonResponse({ success: true, message: 'Testimonial updated' });
    }

    // DELETE /api/testimonials/:id - Delete testimonial (admin only)
    if (path.startsWith('/api/testimonials/') && request.method === 'DELETE') {
        const id = path.split('/')[3];

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        await env.DB.prepare(
            'UPDATE testimonials SET is_active = 0 WHERE id = ?'
        ).bind(id).run();

        return jsonResponse({ success: true, message: 'Testimonial deleted' });
    }

    // GET /api/team - Fetch all team members
    if (path === '/api/team' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
            'SELECT * FROM team_members WHERE is_active = 1 ORDER BY display_order, id'
        ).all();
        return jsonResponse(results);
    }

    // POST /api/team - Create team member (admin only)
    if (path === '/api/team' && request.method === 'POST') {
        const data = await request.json() as any;

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        const result = await env.DB.prepare(
            `INSERT INTO team_members (name, role, initials, image_url, display_order)
                     VALUES (?, ?, ?, ?, ?)`
        ).bind(
            data.name,
            data.role,
            data.initials,
            data.image_url || null,
            data.display_order || 0
        ).run();

        return jsonResponse({ success: true, id: result.meta.last_row_id });
    }

    // PUT /api/team/:id - Update team member (admin only)
    if (path.startsWith('/api/team/') && request.method === 'PUT') {
        const id = path.split('/')[3];
        const data = await request.json() as any;

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        await env.DB.prepare(
            `UPDATE team_members 
                     SET name = ?, role = ?, initials = ?, image_url = ?, 
                         display_order = ?, updated_at = CURRENT_TIMESTAMP
                     WHERE id = ?`
        ).bind(
            data.name,
            data.role,
            data.initials,
            data.image_url,
            data.display_order,
            id
        ).run();

        return jsonResponse({ success: true, message: 'Team member updated' });
    }

    // DELETE /api/team/:id - Delete team member (admin only)
    if (path.startsWith('/api/team/') && request.method === 'DELETE') {
        const id = path.split('/')[3];

        const authHeader = request.headers.get('Authorization');
        if (authHeader !== 'Bearer admin-token-here') {
            return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        await env.DB.prepare(
            'UPDATE team_members SET is_active = 0 WHERE id = ?'
        ).bind(id).run();

        return jsonResponse({ success: true, message: 'Team member deleted' });
    }

    // POST /api/bookings - Save booking inquiry
    if (path === '/api/bookings' && request.method === 'POST') {
        const data = await request.json() as any;

        // For now, just return success
        // Later we can save to database or send email
        return jsonResponse({
            success: true,
            message: 'Booking received. We will contact you within 24 hours.'
        });
    }

    // 404 for unknown routes
    return jsonResponse({ error: 'Not found' }, 404);

} catch (error: any) {
    console.error('Worker error:', error);
    return jsonResponse({ error: error.message }, 500);
}
    },
};
