import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GROUP_STEP } from '@/constants/program-selections';
import useFetchGroupsQuery from '../../queries/use-fetch-groups';
import { Skeleton } from '@/components/ui/skeleton';

const GroupCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();

    const { data: groups, isLoading } = useFetchGroupsQuery();

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return groups?.map(item => {
            const isGroupSelected = formValue.groupId === item.id;
            return (
                <Card
                    className="basis-[calc(25%-18px)]"
                    title={item.name}
                    description={`Group tersedia`}
                    key={item.name}
                    imageUrl="/school-program.svg"
                    buttonLabel={isGroupSelected ? 'Group terpilih!' : 'Pilih group'}
                    buttonAction={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_GROUP_STEP,
                            formValue: { groupId: item.id, groupName: item.name },
                        })
                    }
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
