import HeroSection from '@/features/home/components/hero-section';
import WhyUsSection from '@/features/home/components/why-us-section';
import ProgramsSection from '@/features/home/components/programs-section';
import TestimonialsSection from '@/features/home/components/testimonials-section';
import PartnersSection from '@/features/home/components/partners-section';
import LocationsSection from '@/features/home/components/locations-section';
import ContactSection from '@/features/home/components/contact-section';

export default function Home() {
    return (
        <>
            <HeroSection />
            <WhyUsSection />
            <ProgramsSection />
            <PartnersSection />
            <TestimonialsSection />
            <LocationsSection />
            <ContactSection />
        </>
    );
}
