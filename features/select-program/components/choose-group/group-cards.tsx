import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GROUP_STEP } from '@/constants/program-selections';
import useFetchGroupsQuery from '../../queries/use-fetch-groups';
import { Skeleton } from '@/components/ui/skeleton';
import useFetchPlacementTestMutation from '../../queries/use-fetch-placement-test';

const GroupCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { mutate } = useFetchPlacementTestMutation();

    const { data: groups, isLoading } = useFetchGroupsQuery();

    const imageUrl = (idx: number) => {
        if (formValue.programId === 1) {
            if (idx === 0) {
                return '/groups/1.svg';
            }
            if (idx === 1) {
                return '/groups/2.svg';
            }
            if (idx === 2) {
                return '/groups/3.svg';
            }
            if (idx === 3) {
                return '/groups/4.svg';
            }
        } else {
            if (idx === 0) {
                return '/groups/5.svg';
            }
            if (idx === 1) {
                return '/groups/6.svg';
            }
            if (idx === 2) {
                return '/groups/7.svg';
            }
        }

        return '/groups/1.svg';
    };

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return groups?.map((item, idx) => {
            const isGroupSelected = formValue.groupId === item.id;
            return (
                <Card
                    className="sm:basis-[calc(50%-18px)] xl:basis-[calc(25%-18px)]"
                    title={item.name}
                    description={`Group tersedia`}
                    key={item.name}
                    imageUrl={imageUrl(idx)}
                    buttonLabel={isGroupSelected ? 'Group terpilih!' : 'Pilih group'}
                    buttonAction={() => {
                        handleNextStepAction({
                            stepId: CHOOSE_GROUP_STEP,
                            formValue: { groupId: item.id, groupName: item.name },
                        });
                        mutate({ testId: item.id });
                    }}
                    selected={isGroupSelected}
                />
            );
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap mt-8">
            {renderContent()}
        </div>
    );
};

export default GroupCards;
