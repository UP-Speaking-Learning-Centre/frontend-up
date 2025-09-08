import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GRADE_STEP, CHOOSE_GROUP_STEP } from '@/constants/program-selections';
import { Skeleton } from '@/components/ui/skeleton';
import useFetchGradesQuery from '../../queries/use-fetch-grades';

const GradeCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: grades, isLoading } = useFetchGradesQuery();

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return grades?.map(item => {
            const isGradeSelected = formValue.gradeId === item.id;
            return (
                <Card
                    className="basis-[calc(25%-18px)]"
                    title={`${formValue.levelName} ${item.gradeNumber}`}
                    description={item.prerequisites}
                    key={item.id}
                    imageUrl="/school-program.svg"
                    buttonLabel={isGradeSelected ? 'Grade terpilih!' : 'Pilih grade'}
                    buttonAction={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_GRADE_STEP,
                            formValue: {
                                gradeId: item.id,
                                gradeName: `${formValue.levelName} ${item.gradeNumber}`,
                            },
                        })
                    }
                    selected={isGradeSelected}
                />
            );
        });
    };

    return <div className="flex gap-4 mt-8">{renderContent()}</div>;
};

export default GradeCards;
