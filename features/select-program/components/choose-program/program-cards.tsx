import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_PROGRAM_STEP } from '@/constants/program-selections';
import useFetchProgramsQuery from '../../queries/use-fetch-programs';
import { Skeleton } from '@/components/ui/skeleton';

const ProgramCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: programs, isLoading } = useFetchProgramsQuery();

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(3)].map((_, i) => <Skeleton key={i} className="h-80 basis-1/3" />);
        }

        return programs?.map(item => {
            const isProgramSelected = formValue.programId === item.id;
            return (
                <Card
                    title={item.name}
                    description={item.description}
                    key={item.id}
                    className="basis-1/3"
                    imageUrl="/school-program.svg"
                    buttonLabel={isProgramSelected ? 'Kamu pilih program ini!' : 'Pilih program'}
                    buttonAction={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_PROGRAM_STEP,
                            formValue: { programId: item.id },
                        })
                    }
                    selected={isProgramSelected}
                />
            );
        });
    };

    return (
        <div className="flex items-center flex-col md:flex-row justify-center gap-4 mt-8">
            {renderContent()}
        </div>
    );
};

export default ProgramCards;
