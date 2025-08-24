import React from 'react';
import ChoosePrograms from './choose-program';
import ChooseGroup from './choose-group';
import GroupInformation from './group-information';
import ChooseLevel from './choose-level';

const ProgramSelectionComponent = () => {
    return (
        <div>
            <ChoosePrograms />
            <ChooseGroup />
            <GroupInformation />
            <ChooseLevel />
        </div>
    );
};

export default ProgramSelectionComponent;
