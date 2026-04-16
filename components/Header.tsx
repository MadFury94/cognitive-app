'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Stories', href: '/stories' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Cogniskills Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant="ghost"
                                size="default"
                                asChild
                            >
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                        <Button
                            size="lg"
                            className="ml-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6"
                            asChild
                        >
                            <Link href="/book-assessment">
                                Book Free Assessment
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Button
                                    key={link.name}
                                    variant="ghost"
                                    className="justify-start"
                                    asChild
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </Button>
                            ))}
                            <Button
                                className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full"
                                asChild
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link href="/book-assessment">
                                    Book Free Assessment
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
