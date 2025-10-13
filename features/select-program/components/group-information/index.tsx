import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { GROUP_INFORMATION_STEP } from '@/constants/program-selections';
import GroupInformationTabs from './group-information-tabs';
import { Button } from '@/components/ui/button';
import useProgramSelectionStore from '../../stores/program-selection-store';

const LevelInformation = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();
    const { groupName } = useProgramSelectionStore(s => s.formValue);

    if (!isStepDisplayed(GROUP_INFORMATION_STEP)) {
        return null;
    }

    return (
        <div
            id={GROUP_INFORMATION_STEP}
            className="h-[calc(100vh-64px)] flex flex-col justify-center"
        >
            <Title
                title={`Informasi Kelas - ${groupName}`}
                description="Learn about the curriculum and expected outcomes for your selected program."
            />
            <GroupInformationTabs />
            <div className="mt-6 flex items-center w-full justify-center">
                <Button
                    onClick={() =>
                        handleNextStepAction({ stepId: GROUP_INFORMATION_STEP, formValue: {} })
                    }
                >
                    Lanjutkan ke Pemilihan Level
                </Button>
            </div>
        </div>
    );
};

export default LevelInformation;
