import Image from 'next/image';

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
                {/* Lighter gradient on mobile so image/students are visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 sm:from-slate-900/95 sm:via-slate-900/85 sm:to-slate-900/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-amber-400 font-semibold tracking-wide uppercase text-sm sm:text-base mb-4 sm:mb-5">
                    {label}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 max-w-2xl">
                    {title}
                </h1>
                {description && (
                    <p className="text-base sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* Decorative Element */}
            <div className="absolute top-8 right-8 w-12 h-12 lg:w-20 lg:h-20">
                <div className="w-full h-full rounded-full bg-amber-400/20 animate-pulse" />
            </div>
        </section>
    );
}
