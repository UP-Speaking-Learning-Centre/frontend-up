import PageHero from '@/features/landing/components/page-hero';
import OurStorySection from '@/features/landing/components/about/our-story-section';
import MentorsSection from '@/features/landing/components/about/mentors-section';

export default function AboutPage() {
    return (
        <>
            <PageHero
                title={
                    <>
                        Building Confidence <br /> for the Future.
                    </>
                }
                description="Kami percaya bahwa setiap anak bisa naik level bukan cuma dalam grammar, tapi juga dalam percaya diri untuk ngomong English."
            />
            <OurStorySection />
            <MentorsSection />
        </>
    );
}
