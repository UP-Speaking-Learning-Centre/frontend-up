'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ProgramSelectionComponent from '@/features/select-program/components/program-selection-component';
import { FORM_VALUE_KEY } from '@/features/placement-test/hooks/use-placement-test';
import useProgramSelectionStore, {
    initialFormValue,
} from '@/features/select-program/stores/program-selection-store';

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
            <div className="relative isolate overflow-hidden bg-secondary py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl lg:mx-0">
                        <h1 className="text-4xl font-rubik uppercase font-semibold tracking-wide text-white sm:text-5xl">
                            Mulai Belajar Sekarang!
                        </h1>
                        <p className="mt-6 text-lg leading-8 w-2/3 text-gray-300">
                            Kami ingin kamu belajar sesuai dengan tingkatanmu, cobalah untuk memilih
                            program yang sesuai dengan kebutuhanmu.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-48">
                <ProgramSelectionComponent />
            </div>
        </>
    );
}
