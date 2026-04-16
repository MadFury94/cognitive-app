import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Start your child's transformation today
                </h2>
                <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                    Book a free assessment and discover exactly what's holding your child back — and how we can fix it.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        size="lg"
                        className="bg-white text-orange-700 hover:bg-gray-100 hover:text-orange-800 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                        asChild
                    >
                        <Link href="/book-assessment">
                            Book free assessment
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-orange-700 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                        asChild
                    >
                        <Link href="/contact">
                            Speak to a specialist
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
