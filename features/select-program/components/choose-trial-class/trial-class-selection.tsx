'use client';

import React, { useState } from 'react';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { getNextSchedules, TrialClassSchedule } from '@/lib/trial-class';
import { Schedule } from '@/types/study-group';
import { cn } from '@/lib/utils';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_TRIAL_CLASS_STEP } from '@/constants/program-selections';
import moment from 'moment';
import { dayNames, days } from '@/constants/schedule';

const TrialClassSelection = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { handleNextStepAction } = useProgramSelection();
    const [seeAllSchedule, setSeeAllSchedule] = useState(false);

    const selfSchedules = formValue.selfSchedule.map(schedule => ({
        scheduleId: undefined,
        dayOfWeek: days[dayNames.findIndex(day => day === schedule.dayOfWeek)],
        startTime: schedule.startTime,
        endTime: moment(schedule.startTime, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
        durationMinutes: 90,
    }));

    const schedules = [
        formValue.studyGroupDetail?.schedule1,
        formValue.studyGroupDetail?.schedule2,
    ] as Schedule[];

    const trialClassDates = getNextSchedules(
        formValue.isUseSelfSchedule ? selfSchedules : schedules
    );
    const displayedDates = seeAllSchedule ? trialClassDates : [trialClassDates[0]];

    const handleSelectDate = (date: string) => {
        handleNextStepAction({
            stepId: CHOOSE_TRIAL_CLASS_STEP,
            formValue: { trialClassAt: date },
        });
    };

    const renderScheduleCard = (date: TrialClassSchedule) => {
        return (
            <div
                key={date.actualDate}
                className={cn(
                    'text-semibold p-4 bg-secondary text-white rounded-lg border-2 cursor-pointer hover:border-primary',
                    date.actualDate === formValue.trialClassAt
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-[#E5E7EB]'
                )}
                onClick={() => handleSelectDate(date.actualDate)}
            >
                {date.display}
            </div>
        );
    };

    return (
        <div className="text-center mt-20 max-w-4xl mx-auto">
            <p className="text-[#020817] text-xl">
                Kami ingin menjadwalkan{' '}
                <span className="font-medium text-primary">kelas gratis</span> untuk anda di{' '}
                <span className="font-medium text-primary">cabang {formValue.locationName}</span>.
            </p>

            <div className="mt-4 gap-4 space-y-2 w-fit mx-auto">
                {displayedDates.map(renderScheduleCard)}

                {!seeAllSchedule && (
                    <p
                        className="text-primary cursor-pointer p-2 border-b border-b-primary"
                        onClick={() => setSeeAllSchedule(true)}
                    >
                        Lihat pilihan jadwal lainnya
                    </p>
                )}
            </div>
        </div>
    );
};

export default TrialClassSelection;
