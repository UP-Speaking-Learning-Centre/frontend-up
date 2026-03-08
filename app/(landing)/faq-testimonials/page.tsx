import PageHero from '@/features/landing/components/page-hero';
import TestimonialsSection from '@/features/landing/components/faq-testimonials/testimonials-section';
import FAQSection from '@/features/landing/components/faq-testimonials/faq-section';
import CTASection from '@/features/landing/components/faq-testimonials/cta-section';

export default function FAQTestimonialsPage() {
    return (
        <>
            <PageHero
                title="FAQ & Testimonials"
                description="Find answers to common questions and hear from our students about their experiences at UP SLC."
            />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </>
    );
}
