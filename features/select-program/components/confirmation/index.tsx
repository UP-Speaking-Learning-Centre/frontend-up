import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { CONFIRMATION_STEP } from '@/constants/program-selections';
import { Button } from '@/components/ui/button';

const ChooseTrialClass = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();

    if (!isStepDisplayed(CONFIRMATION_STEP)) {
        return null;
    }

    return (
        <div id={CONFIRMATION_STEP} className="min-h-[calc(100vh-64px)] py-56">
            <div className="max-w-2xl mx-auto">
                <p className="text-sm">Sebelum lanjut, kami ingin menginformasikan bahwa:</p>
                <p className="font-bold text-2xl">
                    Tim UP SLC akan menghubungi anda lewat{' '}
                    <span className="text-primary">Whatsapp</span> jika terdapat perubahan jadwal!
                </p>
                <Button
                    className="mt-4"
                    onClick={() =>
                        handleNextStepAction({ stepId: CONFIRMATION_STEP, formValue: {} })
                    }
                >
                    Isi data diri
                </Button>
            </div>
        </div>
    );
};

export default ChooseTrialClass;
