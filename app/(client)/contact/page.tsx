import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ContactSection from '@/components/about/ContactSection';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Cogniskills in Lagos. Our specialists respond within 24 hours to discuss how we can help your child thrive.",
    alternates: { canonical: "https://cogniskillsleh.com/contact" },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="GET IN TOUCH"
                title="Let's talk about your child"
                description="One of our specialists will reach out within 24 hours to discuss how we can help."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776382940/african-kid-standing-whiteboard_fgn0l6.jpg"
            />
            <ContactSection />
        </div>
    );
}
