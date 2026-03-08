import PageHero from '@/features/landing/components/page-hero';
import ProgramsListSection from '@/features/landing/components/programs/programs-list-section';
import ApplicationProcessSection from '@/features/landing/components/programs/application-process-section';

export default function ProgramsPage() {
    return (
        <>
            <PageHero
                title="Our Programs"
                description="Choose your path, grow your confidence. Dari anak SD sampai dewasa, program UP! bantu upgrade English & percaya diri—step by step, fun, and effective."
            />
            <ProgramsListSection />
            <ApplicationProcessSection />
        </>
    );
}
