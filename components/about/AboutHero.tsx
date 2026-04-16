import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutHero() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm">
                                Our Story
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Two decades of transforming how children learn
                            </h1>
                        </div>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Cogniskills was founded on the belief that every child can learn — sometimes the brain just needs the right training to unlock that ability. Since 2004, our certified specialists have helped hundreds of Nigerian families find hope and lasting results.
                            </p>
                            <p>
                                We combine neuroscience, cognitive psychology, and education therapy to build programs that work from the inside out.
                            </p>
                        </div>

                        <Button
                            size="lg"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-base"
                            asChild
                        >
                            <Link href="/team">
                                Meet our team
                            </Link>
                        </Button>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50 shadow-xl">
                            <Image
                                src="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776382027/2149091515_ejlhwz.jpg"
                                alt="Children learning at Cogniskills"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
