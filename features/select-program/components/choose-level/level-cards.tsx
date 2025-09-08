import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_LEVEL_STEP, GROUP_WITH_PLACEMENT_TEST } from '@/constants/program-selections';
import useFetchLevelsQuery from '../../queries/use-fetch-levels';
import WithPlacementTest from './with-placement-test';
import { Skeleton } from '@/components/ui/skeleton';

const LevelCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: levels, isLoading } = useFetchLevelsQuery();

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
                            className="basis-[calc(25%-18px)]"
                            title={item.name}
                            description={item.description}
                            key={item.id}
                            imageUrl="/school-program.svg"
                            buttonLabel={isLevelSelected ? 'Level terpilih!' : 'Pilih level'}
                            buttonAction={() =>
                                handleNextStepAction({
                                    stepId: CHOOSE_LEVEL_STEP,
                                    formValue: { levelId: item.id, levelName: item.name },
                                })
                            }
                            selected={isLevelSelected}
                        />
                    );
                })}

                <WithPlacementTest
                    display={GROUP_WITH_PLACEMENT_TEST.includes(Number(formValue.groupId))}
                />
            </>
        );
    };

    return <div className="flex gap-4 justify-center flex-wrap mt-8">{renderContent()}</div>;
};

export default LevelCards;
