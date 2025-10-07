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

    const imageUrl = (idx: number) => {
        if (idx === 0) {
            return '/levels/1.svg';
        }
        if (idx === 1) {
            return '/levels/2.svg';
        }
        if (idx === 2) {
            return '/levels/3.svg';
        }
        if (idx === 3) {
            return '/levels/4.png';
        }
        if (idx === 4) {
            return '/levels/5.png';
        }
        if (idx === 5) {
            return '/levels/6.svg';
        }
        if (idx === 6) {
            return '/levels/7.svg';
        }
        if (idx === 7) {
            return '/levels/8.svg';
        }

        return '/levels/8.svg';
    };

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return (
            <>
                {levels?.map((item, idx) => {
                    const isLevelSelected = formValue.levelId === item.id;
                    return (
                        <Card
                            className="sm:basis-[calc(50%-18px)] md:basis-[calc(33%-18px)] lg:basis-[calc(25%-18px)]"
                            title={item.name}
                            description={item.description}
                            key={item.id}
                            imageUrl={imageUrl(idx)}
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

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap mt-8">
            {renderContent()}
        </div>
    );
};

export default LevelCards;
