import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { CHOOSE_TRIAL_CLASS_STEP } from '@/constants/program-selections';
import TrialClassSelection from './trial-class-selection';

const ChooseTrialClass = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_TRIAL_CLASS_STEP)) {
        return null;
    }

    return (
        <div id={CHOOSE_TRIAL_CLASS_STEP} className="min-h-[calc(100vh-64px)] py-24">
            <Title
                title="Pilih Trial Class"
                description="Choose the trial class category that matches your educational needs."
            />
            <TrialClassSelection />
        </div>
    );
};

export default ChooseTrialClass;
