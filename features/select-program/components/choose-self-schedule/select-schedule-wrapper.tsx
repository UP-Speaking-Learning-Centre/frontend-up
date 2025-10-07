import React from 'react';
import SelectScheduleComponent from './select-schedule-component';
import useProgramSelectionStore from '../../stores/program-selection-store';

const SelectScheduleWrapper = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);

    const setNewData = (key: string, value: string, index: number) => {
        const newData = [...formValue.selfSchedule];
        newData[index] = { ...newData[index], [key]: value };
        setFormValue({ selfSchedule: newData });
    };

    return (
        <>
            <SelectScheduleComponent
                day={formValue.selfSchedule[0]?.dayOfWeek}
                index={0}
                setDay={day => setNewData('dayOfWeek', day as string, 0)}
                time={formValue.selfSchedule[0]?.startTime}
                setTime={time => setNewData('startTime', time as string, 0)}
            />
            <SelectScheduleComponent
                day={formValue.selfSchedule[1]?.dayOfWeek}
                index={1}
                setDay={day => setNewData('dayOfWeek', day as string, 1)}
                time={formValue.selfSchedule[1]?.startTime}
                setTime={time => setNewData('startTime', time as string, 1)}
            />
        </>
    );
};

export default SelectScheduleWrapper;
