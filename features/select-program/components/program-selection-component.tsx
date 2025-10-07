import React from 'react';
import ChoosePrograms from './choose-program';
import ChooseGroup from './choose-group';
import GroupInformation from './group-information';
import ChooseLevel from './choose-level';
import ChooseSchedule from './choose-schedule';
import Summary from './summary';
import ChoosePackage from './choose-package';
import Price from './price';
import FormInformation from './form-information';
import ChooseTrialClass from './choose-trial-class';
import ChooseSelfSchedule from './choose-self-schedule';
import Confirmation from './confirmation';

const ProgramSelectionComponent = () => {
    return (
        <div>
            <ChoosePrograms />
            <ChooseGroup />
            <GroupInformation />
            <ChooseLevel />
            <ChoosePackage />
            <ChooseSchedule />
            <ChooseSelfSchedule />
            <ChooseTrialClass />
            <Summary />
            <Price />
            <Confirmation />
            <FormInformation />
        </div>
    );
};

export default ProgramSelectionComponent;
