import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { CHOOSE_PROGRAM_STEP } from '@/constants/program-selections';
import ProgramCards from './program-cards';

const ChoosePrograms = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_PROGRAM_STEP)) {
        return null;
    }

    return (
        <div id={CHOOSE_PROGRAM_STEP} className="py-24">
            <Title
                title="Pilih Program Anda"
                description="Choose the program category that matches your educational needs."
            />
            <ProgramCards />
        </div>
    );
};

export default ChoosePrograms;
