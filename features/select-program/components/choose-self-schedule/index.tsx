import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import React from 'react';
import { CHOOSE_SELF_SCHEDULE_STEP } from '@/constants/program-selections';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { Button } from '@/components/ui/button';
import SelectScheduleWrapper from './select-schedule-wrapper';

const ChooseSelfSchedule = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();
    const formValue = useProgramSelectionStore(s => s.formValue);

    const isTrialClassDisabled =
        formValue.selfSchedule.length < 2 ||
        formValue.selfSchedule.some(schedule => !schedule.dayOfWeek || !schedule.startTime);

    if (!isStepDisplayed(CHOOSE_SELF_SCHEDULE_STEP) || !formValue.isUseSelfSchedule) {
        return null;
    }

    return (
        <div id={CHOOSE_SELF_SCHEDULE_STEP} className="py-32">
            <Title
                title="Pilih Jadwal Belajar"
                description="Pilih jadwal belajar sendiri sesuai dengan kebutuhan Anda."
            />

            <div className="grid mt-10 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <SelectScheduleWrapper />
            </div>

            <div className="flex mt-6 items-center gap-4 justify-center w-full max-w-3xl mx-auto">
                <Button
                    disabled={isTrialClassDisabled}
                    onClick={() => {
                        handleNextStepAction({
                            stepId: CHOOSE_SELF_SCHEDULE_STEP,
                            formValue: {},
                        });
                    }}
                >
                    Pilih Trial Class
                </Button>
            </div>
        </div>
    );
};

export default ChooseSelfSchedule;
