import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_LEVEL_STEP } from '@/constants/program-selections';
import useFetchLevelsQuery from '../../queries/use-fetch-levels';
import WithPlacementTest from './with-placement-test';
import { Skeleton } from '@/components/ui/skeleton';

const LevelCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: levels, isLoading } = useFetchLevelsQuery();

    console.log(levels);
    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return (
            <>
                {levels?.map(item => {
                    const isLevelSelected = formValue.levelId === item.id;
                    return (
                        <Card
                            title={item.name}
                            description={item.description}
                            key={item.name}
                            imageUrl="/school-program.svg"
                            buttonLabel={isLevelSelected ? 'Level terpilih!' : 'Pilih level'}
                            buttonAction={() =>
                                handleNextStepAction({
                                    stepId: CHOOSE_LEVEL_STEP,
                                    formValue: { levelId: item.id },
                                })
                            }
                            selected={isLevelSelected}
                        />
                    );
                })}

                <WithPlacementTest display={true} />
            </>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {renderContent()}
        </div>
    );
};

export default LevelCards;
