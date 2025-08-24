import React from 'react';
import data from '@/data/dummy.json';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_PROGRAM_STEP } from '@/constants/program-selections';

const ProgramCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const programs = data.programs;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {programs.map(item => {
                const isProgramSelected = formValue.programCategory === item.category;
                return (
                    <Card
                        title={item.category}
                        description={item.description}
                        key={item.category}
                        imageUrl="/school-program.svg"
                        buttonLabel={isProgramSelected ? 'Selected' : 'Select'}
                        buttonAction={() =>
                            handleNextStepAction({
                                stepId: CHOOSE_PROGRAM_STEP,
                                formValue: { programCategory: item.category },
                            })
                        }
                        selected={isProgramSelected}
                    />
                );
            })}
        </div>
    );
};

export default ProgramCards;
