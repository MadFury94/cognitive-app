import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import BookingForm from '@/components/booking/BookingForm';
import { bookingPageContent } from '@/lib/content';

export const metadata: Metadata = {
    title: "Book a Cognitive Assessment | Cogniskills Lagos",
    description: "Schedule a comprehensive Cognigym cognitive assessment for your child. Our specialists in Lagos will create a personalised brain training plan.",
    alternates: { canonical: "https://cogniskillsleh.com/booking" },
};

export default function BookingPage() {
    const { header } = bookingPageContent;
    return (
        <div className="min-h-screen">
            <PageHeader
                label={header.label}
                title={header.title}
                description={header.description}
                imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop"
            />
            <BookingForm />
        </div>
    );
}
