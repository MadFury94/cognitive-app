'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-orange-500 font-medium px-4 py-2 rounded-lg transition-all hover:bg-orange-50"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/book-assessment"
                            className="ml-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            Book Free Assessment
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium px-4 py-3 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/book-assessment"
                                className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Book Free Assessment
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
