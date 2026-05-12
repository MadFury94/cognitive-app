import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
    label: string;
    title: string;
    description?: string;
    imageSrc: string;
}

export default function PageHeader({ label, title, description, imageSrc }: PageHeaderProps) {
    return (
        <section className="relative py-28 lg:py-40 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-center sm:object-top"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 sm:from-slate-900/95 sm:via-slate-900/85 sm:to-slate-900/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors group"
                    >
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                        </span>
                        <span>Home</span>
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                    <span className="text-white/90 text-sm font-medium">{label}</span>
                </nav>

                {/* Label */}
                <p className="text-brand-300 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4 sm:mb-5">
                    {label}
                </p>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 max-w-2xl">
                    {title}
                </h1>

                {/* Description */}
                {description && (
                    <p className="text-base sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* Decorative pulse */}
            <div className="absolute top-8 right-8 w-12 h-12 lg:w-20 lg:h-20 pointer-events-none">
                <div className="w-full h-full rounded-full bg-brand-400/20 animate-pulse" />
            </div>
        </section>
    );
}
