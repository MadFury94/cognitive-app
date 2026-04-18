// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cogniskills-app.onochieazukaeme.workers.dev';

// Get admin token from localStorage
export const getAdminToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token-here';
    }
    return process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token-here';
};

// API helper functions
export const api = {
    // Programs
    getPrograms: () => fetch(`${API_URL}/api/programs`),

    updateProgram: (id: number, data: any) =>
        fetch(`${API_URL}/api/programs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAdminToken()}`
            },
            body: JSON.stringify(data)
        }),

    // Testimonials
    getTestimonials: () => fetch(`${API_URL}/api/testimonials`),

    createTestimonial: (data: any) =>
        fetch(`${API_URL}/api/testimonials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAdminToken()}`
            },
            body: JSON.stringify(data)
        }),

    updateTestimonial: (id: number, data: any) =>
        fetch(`${API_URL}/api/testimonials/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAdminToken()}`
            },
            body: JSON.stringify(data)
        }),

    deleteTestimonial: (id: number) =>
        fetch(`${API_URL}/api/testimonials/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAdminToken()}`
            }
        }),
};
