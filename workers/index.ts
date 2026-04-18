export interface Env {
    DB: D1Database;
}

// CORS headers for allowing requests from your frontend
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight requests
function handleOptions() {
    return new Response(null, {
        headers: corsHeaders,
    });
}

// Helper to create JSON responses with CORS
function jsonResponse(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
        },
    });
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return handleOptions();
        }

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
