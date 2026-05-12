import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ctaContent } from '@/lib/content';

export default function CTASection() {
    const { heading, description, primaryCta, secondaryCta } = ctaContent;

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {heading}
                </h2>
                <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        size="lg"
                        className="bg-white text-brand-700 hover:bg-gray-100 hover:text-brand-800 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                        asChild
                    >
                        <Link href={primaryCta.href}>
                            {primaryCta.label}
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-700 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                        asChild
                    >
                        <Link href={secondaryCta.href}>
                            {secondaryCta.label}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
