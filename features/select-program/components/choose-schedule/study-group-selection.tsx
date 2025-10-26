'use client';

import React from 'react';
import useFetchLocationsQuery from '../../queries/use-fetch-locations';
import useProgramSelectionStore from '../../stores/program-selection-store';
import useFetchAvailableStudyGroupQuery from '../../queries/use-fetch-available-study-group';
import useProgramSelection from '../../hooks/use-program-selection';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import moment from 'moment';

import { dayNames, days } from '@/constants/schedule';
import {
    CHOOSE_PACKAGE_STEP,
    CHOOSE_SCHEDULE_STEP,
    CHOOSE_SELF_SCHEDULE_STEP,
} from '@/constants/program-selections';
import StudyGroupComponent from './study-group-component';
import LocationComponent from './location-component';

export const CHOOSE_LOCATION_STEP = 'choose-location';
export const CHOOSE_STUDY_GROUP = 'study-group';

const steps = [CHOOSE_LOCATION_STEP, CHOOSE_STUDY_GROUP];

const StudyGroupSelection = () => {
    const { data: locations, isLoading: isLoadingLocation } = useFetchLocationsQuery();
    const { data: availableStudyGroup, isLoading } = useFetchAvailableStudyGroupQuery();

    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const resetBasedOnStep = useProgramSelectionStore(s => s.resetBasedOnStep);
    const formValue = useProgramSelectionStore(s => s.formValue);

    const { handleNextStepAction, setToStep } = useProgramSelection();
    const [currentStep, setCurrentStep] = React.useState(0);

    const { studyGroupId, locationName, isUseSelfSchedule } = formValue;

    const scrollToStep = (stepId: (typeof steps)[number]) => {
        const currentStepElement = document.getElementById(steps[currentStep]);
        const stepElement = document.getElementById(stepId);
        const headerOffset = 100;

        setTimeout(() => {
            if (stepElement) {
                const elementPosition = stepElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            } else if (currentStepElement) {
                const bottom = currentStepElement.getBoundingClientRect().bottom;
                const offsetPosition = window.pageYOffset + bottom - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    const onClickStep = (stepId: (typeof steps)[number]) => {
        const nextStep = steps.findIndex(step => step === stepId) + 1;
        setCurrentStep(nextStep);
        scrollToStep(stepId);
    };

    const renderLocation = () => {
        if (isLoadingLocation) {
            return [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 basis-1/3" />);
        }

        return (
            <div className="mx-auto w-full" id={CHOOSE_LOCATION_STEP}>
                <p className="text-center text-[#020817] font-medium">Pilih Cabang</p>
                <div className="flex w-full mx-auto gap-4 mt-4">
                    {locations?.map(item => (
                        <LocationComponent
                            key={item.locationId}
                            location={item}
                            onClick={() => {
                                if (studyGroupId) {
                                    setToStep(CHOOSE_PACKAGE_STEP);
                                    resetBasedOnStep(CHOOSE_PACKAGE_STEP);
                                }
                                onClickStep(CHOOSE_STUDY_GROUP);
                                setFormValue({
                                    locationName: item.locationName,
                                    locationId: item.locationId,
                                });
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderStudyGroup = () => {
        if (!locationName) return null;

        if (isLoading) {
            return (
                <div className="mx-auto w-full lg:w-10/12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="basis-full md:basis-2/5 p-2 border border-neutral-200 rounded-md"
                            >
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-20 w-20" />
                                    <div className="flex flex-col gap-2">
                                        <div className="space-y-2">
                                            <Skeleton className="h-2 w-16" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-2 w-16" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                </div>
                                <Skeleton className="h-20 w-full mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (!availableStudyGroup) {
            return (
                <div className="mx-auto max-w-4xl flex flex-col items-center justify-center gap-2">
                    <p className="text-center text-[#020817] text-lg font-medium">
                        Pilih jadwal yang anda inginkan!
                    </p>
                    <Button
                        onClick={() =>
                            handleNextStepAction({
                                stepId: CHOOSE_SCHEDULE_STEP,
                                formValue: { isUseSelfSchedule: true },
                            })
                        }
                    >
                        Pilih Jadwal
                    </Button>
                </div>
            );
        }

        return (
            <StudyGroupComponent
                availableStudyGroup={availableStudyGroup}
                studyGroupId={studyGroupId as number}
                handleNextStepAction={handleNextStepAction}
            />
        );
    };

    const renderButton = () => {
        if (!locationName || !availableStudyGroup) return null;

        return (
            <div className="mx-auto max-w-4xl flex flex-col items-center justify-center gap-2">
                <p className="text-center text-[#020817] text-lg font-medium">
                    Jadwal tidak sesuai dengan yang Anda inginkan?
                </p>
                <Button
                    onClick={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_SCHEDULE_STEP,
                            formValue: { isUseSelfSchedule: true },
                        })
                    }
                >
                    Coba pilih jadwal sendiri
                </Button>
            </div>
        );
    };

    return (
        <div className="mt-10 flex flex-col gap-20">
            {renderLocation()}
            {renderStudyGroup()}
            {renderButton()}
        </div>
    );
};

export default StudyGroupSelection;
