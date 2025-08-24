import React from 'react';
import data from '@/data/dummy.json';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GROUP_STEP } from '@/constants/program-selections';

const GroupCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const groups = data.programs.find(item => item.category === formValue.programCategory)?.groups;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {groups!.map(item => {
                const isGroupSelected = formValue.group === item.name;
                return (
                    <Card
                        title={item.name}
                        description={`${item.levels.length} level tersedia`}
                        key={item.name}
                        imageUrl="/school-program.svg"
                        buttonLabel={isGroupSelected ? 'Selected' : 'Select'}
                        buttonAction={() =>
                            handleNextStepAction({
                                stepId: CHOOSE_GROUP_STEP,
                                formValue: { group: item.name },
                            })
                        }
                        selected={isGroupSelected}
                    />
                );
            })}
        </div>
    );
};

export default GroupCards;
