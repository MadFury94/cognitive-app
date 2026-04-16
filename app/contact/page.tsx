import PageHeader from '@/components/PageHeader';
import ContactSection from '@/components/about/ContactSection';

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
