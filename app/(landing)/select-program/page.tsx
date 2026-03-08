'use client';

import { useEffect } from 'react';
import ProgramSelectionComponent from '@/features/select-program/components/program-selection-component';
import { FORM_VALUE_KEY } from '@/features/placement-test/hooks/use-placement-test';
import useProgramSelectionStore, {
    initialFormValue,
} from '@/features/select-program/stores/program-selection-store';
import PageHero from '@/features/landing/components/page-hero';

export default function SelectProgramPage() {
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const setCurrentStep = useProgramSelectionStore(s => s.setCurrentStep);

    useEffect(() => {
        setCurrentStep(0);
        setFormValue(initialFormValue);
        localStorage.removeItem(FORM_VALUE_KEY);
    }, []);

    return (
        <>
            <PageHero
                title="Mulai Belajar Sekarang!"
                description="Kami ingin kamu belajar sesuai dengan tingkatanmu, cobalah untuk memilih program yang sesuai dengan kebutuhanmu."
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-48">
                <ProgramSelectionComponent />
            </div>
        </>
    );
}
