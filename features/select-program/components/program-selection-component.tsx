import React from 'react';
import ChoosePrograms from './choose-program';
import ChooseGroup from './choose-group';
import GroupInformation from './group-information';
import ChooseLevel from './choose-level';
import ScheduleSelection from './choose-schedule/schedule-selection';
import ChooseSchedule from './choose-schedule';
import Summary from './summary';
import ChooseGrade from './choose-grade';
import ChoosePackage from './choose-package';
import Price from './price';
import FormInformation from './form-information';

const ProgramSelectionComponent = () => {
    return (
        <div>
            <ChoosePrograms />
            <ChooseGroup />
            <GroupInformation />
            <ChooseLevel />
            <ChooseGrade />
            <ChoosePackage />
            <ChooseSchedule />
            <Summary />
            <Price />
            <FormInformation />
        </div>
    );
};

export default ProgramSelectionComponent;
