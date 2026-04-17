import PageHeader from '@/components/PageHeader';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="BOOK A SESSION"
                title="Start your child's transformation"
                description="Schedule a comprehensive cognitive assessment and personalized training session."
                imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop"
            />
            <BookingForm />
        </div>
    );
}
