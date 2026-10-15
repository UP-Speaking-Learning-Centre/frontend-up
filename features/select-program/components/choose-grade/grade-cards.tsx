import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GRADE_STEP, CHOOSE_GROUP_STEP } from '@/constants/program-selections';
import { Skeleton } from '@/components/ui/skeleton';
import useFetchGradesQuery from '../../queries/use-fetch-grades';

const GradeCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const { data: grades, isLoading } = useFetchGradesQuery();

    const imageUrl = (idx: number) => {
        if (idx === 9) {
            return '/levels/1.svg';
        }
        if (idx === 8) {
            return '/levels/2.svg';
        }
        if (idx === 6) {
            return '/levels/3.svg';
        }
        if (idx === 4) {
            return '/levels/4.png';
        }
        if (idx === 3) {
            return '/levels/5.png';
        }
        if (idx === 2) {
            return '/levels/6.svg';
        }
        if (idx === 1) {
            return '/levels/7.svg';
        }
        if (idx === 0) {
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

        return grades?.map((item, idx) => {
            const isGradeSelected = formValue.gradeId === item.id;
            return (
                <Card
                    className="sm:basis-[calc(50%-18px)] xl:basis-[calc(25%-18px)]"
                    title={`${formValue.levelName} ${item.gradeNumber}`}
                    description={item.prerequisites}
                    key={item.id}
                    imageUrl={imageUrl(idx)}
                    buttonLabel={isGradeSelected ? 'Grade terpilih!' : 'Pilih grade'}
                    buttonAction={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_GRADE_STEP as any,
                            formValue: {
                                gradeId: item.id,
                                gradeName: `${formValue.levelName} ${item.gradeNumber}`,
                                taughtBy: item.taughtBy.map(taughtBy => taughtBy.name),
                            },
                        })
                    }
                    selected={isGradeSelected}
                />
            );
        });
    };

    return <div className="flex flex-col md:flex-row gap-4 mt-8">{renderContent()}</div>;
};

export default GradeCards;
