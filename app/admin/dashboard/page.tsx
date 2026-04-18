'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, MessageSquare, LogOut, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    display_order: number;
}

export default function AdminDashboard() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'programs' | 'testimonials'>('programs');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        loadData();
    }, [router]);

    const loadData = async () => {
        try {
            const [programsRes, testimonialsRes] = await Promise.all([
                fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs'),
                fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials')
            ]);

            const programsData = await programsRes.json();
            const testimonialsData = await testimonialsRes.json();

            setPrograms(programsData);
            setTestimonials(testimonialsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    const handleDeleteTestimonial = async (id: number) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(
                `https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer admin-token-here'
                    }
                }
            );

            if (response.ok) {
                alert('Testimonial deleted successfully!');
                loadData();
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete testimonial');
        }
    };

    const handleSaveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            content: formData.get('content') as string,
            rating: parseInt(formData.get('rating') as string),
            display_order: parseInt(formData.get('display_order') as string),
            image_url: formData.get('image_url') as string || null,
        };

        try {
            const url = editingTestimonial
                ? `https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials/${editingTestimonial.id}`
                : 'https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials';

            const response = await fetch(url, {
                method: editingTestimonial ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token-here'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert(`Testimonial ${editingTestimonial ? 'updated' : 'created'} successfully!`);
                setIsDialogOpen(false);
                setEditingTestimonial(null);
                loadData();
            }
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">CogniSkills Admin</h1>
                            <Badge variant="secondary" className="hidden sm:inline-flex">
                                Management Portal
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" asChild>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    View Live Site
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Programs</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{programs.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{testimonials.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <Button
                        variant={activeTab === 'programs' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('programs')}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Programs
                    </Button>
                    <Button
                        variant={activeTab === 'testimonials' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('testimonials')}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Testimonials
                    </Button>
                </div>

                {/* Programs Tab */}
                {activeTab === 'programs' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Programs</CardTitle>
                            <CardDescription>Edit program details and information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Sessions</TableHead>
                                        <TableHead>Improvement</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {programs.map((program) => (
                                        <TableRow key={program.id}>
                                            <TableCell className="font-medium">{program.title}</TableCell>
                                            <TableCell>{program.duration}</TableCell>
                                            <TableCell>{program.sessions_per_week}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{program.improvement_stat}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/programs/${program.id}`}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Testimonials Tab */}
                {activeTab === 'testimonials' && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Manage Testimonials</CardTitle>
                                    <CardDescription>Add, edit, or remove testimonials</CardDescription>
                                </div>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setEditingTestimonial(null)}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Testimonial
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <form onSubmit={handleSaveTestimonial}>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {editingTestimonial ? 'Edit' : 'Add'} Testimonial
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Fill in the testimonial details below
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        defaultValue={editingTestimonial?.name}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="role">Role</Label>
                                                    <Input
                                                        id="role"
                                                        name="role"
                                                        defaultValue={editingTestimonial?.role}
                                                        placeholder="e.g. Mother of 8-year-old"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="content">Testimonial</Label>
                                                    <Textarea
                                                        id="content"
                                                        name="content"
                                                        defaultValue={editingTestimonial?.content}
                                                        rows={4}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="rating">Rating</Label>
                                                        <Input
                                                            id="rating"
                                                            name="rating"
                                                            type="number"
                                                            min="1"
                                                            max="5"
                                                            defaultValue={editingTestimonial?.rating || 5}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="display_order">Display Order</Label>
                                                        <Input
                                                            id="display_order"
                                                            name="display_order"
                                                            type="number"
                                                            defaultValue={editingTestimonial?.display_order || 0}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="image_url">Image URL (optional)</Label>
                                                    <Input
                                                        id="image_url"
                                                        name="image_url"
                                                        type="url"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Save Testimonial</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {testimonials.map((testimonial) => (
                                        <TableRow key={testimonial.id}>
                                            <TableCell className="font-medium">{testimonial.name}</TableCell>
                                            <TableCell>{testimonial.role}</TableCell>
                                            <TableCell className="max-w-md truncate">{testimonial.content}</TableCell>
                                            <TableCell>
                                                <Badge>{testimonial.rating} ⭐</Badge>
                                            </TableCell>
                                            <TableCell>{testimonial.display_order}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEditingTestimonial(testimonial);
                                                            setIsDialogOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
