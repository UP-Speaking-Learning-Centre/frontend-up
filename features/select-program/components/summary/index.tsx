import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { SUMMARY_STEP } from '@/constants/program-selections';
import SummaryItem from './summary-item';
import { Button } from '@/components/ui/button';

const Summary = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();

    if (!isStepDisplayed(SUMMARY_STEP)) {
        return null;
    }

    return (
        <div id={SUMMARY_STEP} className="py-24">
            <Title
                title="Rangkuman Program Pilihan Anda"
                description="Silahkan periksa kembali pilihan program Anda."
            />
            <SummaryItem />
            <div className="mt-12 flex items-center w-full justify-center">
                <Button
                    onClick={() => handleNextStepAction({ stepId: SUMMARY_STEP, formValue: {} })}
                >
                    Berapa perkiraan biaya?
                </Button>
            </div>
        </div>
    );
};

export default Summary;
