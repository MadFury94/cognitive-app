import PageHeader from '@/components/PageHeader';
import ContactSection from '@/components/about/ContactSection';

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="GET IN TOUCH"
                title="Let's talk about your child"
                description="One of our specialists will reach out within 24 hours to discuss how we can help."
                imageSrc="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"
            />
            <ContactSection />
        </div>
    );
}
