'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Users, MessageSquare, LogOut, Edit } from 'lucide-react';
import Link from 'next/link';

interface Program {
    id: number;
    slug: string;
    title: string;
    description: string;
    duration: string;
    sessions_per_week: string;
    improvement_stat: string;
    improvement_label: string;
}

export default function AdminDashboard() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        // Fetch programs from API
        fetchPrograms();
    }, [router]);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs');
            const data = await response.json();
            setPrograms(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching programs:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Programs</p>
                                <p className="text-2xl font-bold text-gray-900">{programs.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Blog Posts</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Testimonials</p>
                                <p className="text-2xl font-bold text-gray-900">9</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Programs List */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">
                            Manage Programs
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Edit program details and information
                        </p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {programs.map((program) => (
                            <div key={program.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {program.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <span className="text-gray-600">
                                                <strong>Duration:</strong> {program.duration}
                                            </span>
                                            <span className="text-gray-600">
                                                <strong>Sessions:</strong> {program.sessions_per_week}
                                            </span>
                                            <span className="text-gray-600">
                                                <strong>Improvement:</strong> {program.improvement_stat}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/programs/${program.id}`}
                                        className="ml-4 flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
