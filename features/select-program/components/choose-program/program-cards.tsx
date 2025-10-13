import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_PROGRAM_STEP } from '@/constants/program-selections';
import useFetchProgramsQuery from '../../queries/use-fetch-programs';
import { Skeleton } from '@/components/ui/skeleton';

const ProgramCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: programs, isLoading } = useFetchProgramsQuery();

    const imageUrl = (idx: number) => {
        if (idx === 0) {
            return '/programs/school.svg';
        }
        if (idx === 1) {
            return '/programs/adult.svg';
        }

        return '/programs/school.svg';
    };

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(3)].map((_, i) => <Skeleton key={i} className="h-80 basis-1/3" />);
        }

        return programs?.map((item, idx) => {
            const isProgramSelected = formValue.programId === item.id;
            return (
                <Card
                    title={item.name}
                    description={''}
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/4"
                    imageUrl={imageUrl(idx)}
                    buttonLabel={isProgramSelected ? 'Kamu pilih program ini!' : 'Pilih program'}
                    buttonAction={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_PROGRAM_STEP,
                            formValue: {
                                programId: item.id,
                                programName: item.name,
                                programPrices: item.prices,
                            },
                        })
                    }
                    selected={isProgramSelected}
                />
            );
        });
    };

    return (
        <div className="flex items-start flex-col md:flex-row justify-center gap-4 mt-8">
            {renderContent()}
        </div>
    );
};

export default ProgramCards;
