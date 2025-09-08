import React from 'react';
import useFetchAvailableScheduleQuery from '../../queries/use-fetch-available-schedule';
import ScheduleSelection from './schedule-selection';
import { CHOOSE_SCHEDULE_STEP } from '@/constants/program-selections';
import Title from '../title';
import useProgramSelection from '../../hooks/use-program-selection';

const ChooseSchedule = () => {
    const { isLoading } = useFetchAvailableScheduleQuery();

    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_SCHEDULE_STEP)) {
        return null;
    }

    const renderContent = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        return <ScheduleSelection />;
    };

    return (
        <div id={CHOOSE_SCHEDULE_STEP} className="py-24">
            <Title
                title="Pilih Jadwal & Mentor"
                description="Pilih hingga dua jadwal yang diinginkan untuk sesi Anda."
            />
            <div>{renderContent()}</div>
        </div>
    );
};

export default ChooseSchedule;
