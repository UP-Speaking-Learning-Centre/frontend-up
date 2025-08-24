import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { GROUP_INFORMATION_STEP } from '@/constants/program-selections';
import LevelInformationTabs from './group-information-tabs';
import { Button } from '@/components/ui/button';

const LevelInformation = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();

    if (!isStepDisplayed(GROUP_INFORMATION_STEP)) {
        return null;
    }

    return (
        <div id={GROUP_INFORMATION_STEP} className="py-24">
            <Title
                title="Informasi Level"
                description="Learn about the curriculum and expected outcomes for your selected program."
            />
            <LevelInformationTabs />
            <div className="mt-6 flex items-center w-full justify-center">
                <Button
                    onClick={() =>
                        handleNextStepAction({ stepId: GROUP_INFORMATION_STEP, formValue: {} })
                    }
                >
                    Continue to Level Selection
                </Button>
            </div>
        </div>
    );
};

export default LevelInformation;
