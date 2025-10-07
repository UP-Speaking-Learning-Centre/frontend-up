import React from 'react';
import { CHOOSE_SCHEDULE_STEP } from '@/constants/program-selections';
import Title from '../title';
import useProgramSelection from '../../hooks/use-program-selection';
import StudyGroupSelection from './study-group-selection';

const ChooseSchedule = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_SCHEDULE_STEP)) {
        return null;
    }

    const renderContent = () => {
        return <StudyGroupSelection />;
    };

    return (
        <div id={CHOOSE_SCHEDULE_STEP} className="py-24">
            <Title
                title="Pilih Lokasi dan Jadwal"
                description="Pilih lokasi dan jadwal sesuai dengan cocok dengan Anda."
            />
            <div>{renderContent()}</div>
        </div>
    );
};

export default ChooseSchedule;
