import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { SUMMARY_STEP } from '@/constants/program-selections';
import SummaryItem from './summary-item';

const Summary = () => {
    const { isStepDisplayed } = useProgramSelection();

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
        </div>
    );
};

export default Summary;
