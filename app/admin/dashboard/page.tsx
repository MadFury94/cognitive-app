'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, MessageSquare, LogOut, Edit, Plus, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
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

interface TeamMember {
    id: number;
    name: string;
    role: string;
    initials: string;
    image_url: string | null;
    display_order: number;
}

export default function AdminDashboard() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'programs' | 'testimonials' | 'team'>('programs');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
    const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [editingProgram, setEditingProgram] = useState<Program | null>(null);
    const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
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
            const [programsRes, testimonialsRes, teamRes] = await Promise.all([
                fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs'),
                fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials'),
                fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/team')
            ]);

            const programsData = await programsRes.json();
            const testimonialsData = await testimonialsRes.json();
            const teamData = await teamRes.json();

            setPrograms(programsData);
            setTestimonials(testimonialsData);
            setTeamMembers(teamData);
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

    const handleSaveProgram = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!editingProgram) return;

        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            duration: formData.get('duration') as string,
            sessions_per_week: formData.get('sessions_per_week') as string,
            improvement_stat: formData.get('improvement_stat') as string,
            improvement_label: formData.get('improvement_label') as string,
        };

        try {
            const response = await fetch(
                `https://cogniskills-app.onochieazukaeme.workers.dev/api/programs/${editingProgram.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer admin-token-here'
                    },
                    body: JSON.stringify(data)
                }
            );

            if (response.ok) {
                alert('Program updated successfully!');
                setIsProgramDialogOpen(false);
                setEditingProgram(null);
                loadData();
            }
        } catch (error) {
            console.error('Error saving program:', error);
            alert('Failed to save program');
        }
    };

    const handleSaveTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            initials: formData.get('initials') as string,
            image_url: formData.get('image_url') as string || null,
            display_order: parseInt(formData.get('display_order') as string),
        };

        try {
            const url = editingTeamMember
                ? `https://cogniskills-app.onochieazukaeme.workers.dev/api/team/${editingTeamMember.id}`
                : 'https://cogniskills-app.onochieazukaeme.workers.dev/api/team';

            const response = await fetch(url, {
                method: editingTeamMember ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token-here'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert(`Team member ${editingTeamMember ? 'updated' : 'added'} successfully!`);
                setIsTeamDialogOpen(false);
                setEditingTeamMember(null);
                loadData();
            }
        } catch (error) {
            console.error('Error saving team member:', error);
            alert('Failed to save team member');
        }
    };

    const handleDeleteTeamMember = async (id: number) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        try {
            const response = await fetch(
                `https://cogniskills-app.onochieazukaeme.workers.dev/api/team/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer admin-token-here'
                    }
                }
            );

            if (response.ok) {
                alert('Team member deleted successfully!');
                loadData();
            }
        } catch (error) {
            console.error('Error deleting team member:', error);
            alert('Failed to delete team member');
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
                            <Image
                                src="/logo.png"
                                alt="CogniSkills Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="hidden sm:inline-flex">
                                    Management Portal
                                </Badge>
                            </div>
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
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{teamMembers.length}</div>
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
                    <Button
                        variant={activeTab === 'team' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('team')}
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Team
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingProgram(program);
                                                        setIsProgramDialogOpen(true);
                                                    }}
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Program Edit Dialog */}
                <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <form onSubmit={handleSaveProgram}>
                            <DialogHeader>
                                <DialogTitle>Edit Program</DialogTitle>
                                <DialogDescription>
                                    Update program details below
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={editingProgram?.title}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={editingProgram?.description}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            defaultValue={editingProgram?.duration}
                                            placeholder="e.g. 12-24 weeks"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="sessions_per_week">Sessions/Week</Label>
                                        <Input
                                            id="sessions_per_week"
                                            name="sessions_per_week"
                                            defaultValue={editingProgram?.sessions_per_week}
                                            placeholder="e.g. 2-3 sessions"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="improvement_stat">Improvement Stat</Label>
                                        <Input
                                            id="improvement_stat"
                                            name="improvement_stat"
                                            defaultValue={editingProgram?.improvement_stat}
                                            placeholder="e.g. 2-4 grade levels"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="improvement_label">Improvement Label</Label>
                                        <Input
                                            id="improvement_label"
                                            name="improvement_label"
                                            defaultValue={editingProgram?.improvement_label}
                                            placeholder="e.g. AVG. IMPROVEMENT"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

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

                {/* Team Tab */}
                {activeTab === 'team' && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Manage Team Members</CardTitle>
                                    <CardDescription>Add, edit, or remove team members</CardDescription>
                                </div>
                                <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setEditingTeamMember(null)}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Team Member
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <form onSubmit={handleSaveTeamMember}>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {editingTeamMember ? 'Edit' : 'Add'} Team Member
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Fill in the team member details below
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="team_name">Name</Label>
                                                    <Input
                                                        id="team_name"
                                                        name="name"
                                                        defaultValue={editingTeamMember?.name}
                                                        placeholder="e.g. Dr. John Doe"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="team_role">Role</Label>
                                                    <Input
                                                        id="team_role"
                                                        name="role"
                                                        defaultValue={editingTeamMember?.role}
                                                        placeholder="e.g. Cognitive Director · 20 yrs"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="initials">Initials</Label>
                                                    <Input
                                                        id="initials"
                                                        name="initials"
                                                        defaultValue={editingTeamMember?.initials}
                                                        placeholder="e.g. JD"
                                                        maxLength={3}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="team_image_url">Image URL (optional)</Label>
                                                    <Input
                                                        id="team_image_url"
                                                        name="image_url"
                                                        type="url"
                                                        defaultValue={editingTeamMember?.image_url || ''}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="team_display_order">Display Order</Label>
                                                    <Input
                                                        id="team_display_order"
                                                        name="display_order"
                                                        type="number"
                                                        defaultValue={editingTeamMember?.display_order || 0}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Save Team Member</Button>
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
                                        <TableHead>Initials</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.name}</TableCell>
                                            <TableCell>{member.role}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{member.initials}</Badge>
                                            </TableCell>
                                            <TableCell>{member.display_order}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEditingTeamMember(member);
                                                            setIsTeamDialogOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteTeamMember(member.id)}
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
