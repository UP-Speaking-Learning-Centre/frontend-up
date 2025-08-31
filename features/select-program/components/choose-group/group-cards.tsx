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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {renderContent()}
        </div>
    );
};

export default GroupCards;
