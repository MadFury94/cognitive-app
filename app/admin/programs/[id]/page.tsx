'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
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

export default function EditProgramPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [program, setProgram] = useState<Program | null>(null);

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        // Load program data
        loadProgram();
    }, [params.id, router]);

    const loadProgram = async () => {
        try {
            const response = await fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs');
            const programs = await response.json();
            const foundProgram = programs.find((p: Program) => p.id === Number(params.id));
            setProgram(foundProgram || null);
        } catch (error) {
            console.error('Error loading program:', error);
            alert('Failed to load program');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted!');

        if (!program) {
            console.error('No program data');
            return;
        }

        console.log('Saving program:', program);
        setSaving(true);
        setSuccess(false);

        try {
            const response = await fetch(
                `https://cogniskills-app.onochieazukaeme.workers.dev/api/programs/${program.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer admin-token-here'
                    },
                    body: JSON.stringify(program)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save program');
            }

            const result = await response.json();
            console.log('Save result:', result);

            setSuccess(true);
            alert('Program saved successfully! Changes will appear on the website.');

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error saving program:', error);
            alert('Failed to save program: ' + (error as Error).message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: keyof Program, value: string) => {
        if (!program) return;
        setProgram({ ...program, [field]: value });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading program...</p>
                </div>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Program not found</p>
                    <Link href="/admin/dashboard" className="text-orange-600 hover:text-orange-700">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Dashboard
                            </Link>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Edit Program
                        </h1>
                    </div>
                </div>
            </header>

            {/* Success Message */}
            {success && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        ✓ Program saved successfully!
                    </div>
                </div>
            )}

            {/* Form */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Program Title
                            </label>
                            <input
                                type="text"
                                value={program.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={program.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Duration
                            </label>
                            <input
                                type="text"
                                value={program.duration}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                placeholder="e.g. 12-24 weeks"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Sessions per week */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Sessions Per Week
                            </label>
                            <input
                                type="text"
                                value={program.sessions_per_week}
                                onChange={(e) => handleChange('sessions_per_week', e.target.value)}
                                placeholder="e.g. 2-3 sessions"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Improvement Stat */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Improvement Statistic
                            </label>
                            <input
                                type="text"
                                value={program.improvement_stat}
                                onChange={(e) => handleChange('improvement_stat', e.target.value)}
                                placeholder="e.g. 2-4 grade levels"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Improvement Label */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Improvement Label
                            </label>
                            <input
                                type="text"
                                value={program.improvement_label}
                                onChange={(e) => handleChange('improvement_label', e.target.value)}
                                placeholder="e.g. AVG. IMPROVEMENT"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/dashboard"
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}
