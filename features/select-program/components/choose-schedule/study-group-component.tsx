'use client';
import { StudyGroup } from '@/types/study-group';
import React from 'react';
import { CHOOSE_STUDY_GROUP } from './study-group-selection';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { CHOOSE_SELF_SCHEDULE_STEP } from '@/constants/program-selections';
import Image from 'next/image';
import { dayNames, days } from '@/constants/schedule';
import { cn } from '@/lib/utils';
import moment from 'moment';

const StudyGroupComponent = ({
    availableStudyGroup,
    studyGroupId,
    handleNextStepAction,
}: {
    availableStudyGroup: StudyGroup[];
    studyGroupId: number;
    handleNextStepAction: (arg: any) => void;
}) => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { isUseSelfSchedule } = formValue;

    const renderScheduleTime = (schedule: any, isActive: boolean) => (
        <div
            className={cn('flex flex-col items-center gap-1 justify-center', {
                'text-white': isActive,
                'text-[#020817]': !isActive,
            })}
        >
            <p>{moment(schedule.startTime, 'HH:mm:ss').format('HH:mm')}</p>
            <div
                className={cn('w-[2px] rounded-full h-4', {
                    'bg-white': isActive,
                    'bg-[#020817]': !isActive,
                })}
            />
            <p>{moment(schedule.endTime, 'HH:mm:ss').format('HH:mm')}</p>
        </div>
    );

    return (
        <div className="mx-auto w-full lg:w-10/12" id={CHOOSE_STUDY_GROUP}>
            <p className="text-center text-[#020817] font-medium">Pilih Kelompok Belajar</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
                {availableStudyGroup.map(studyGroup => {
                    const isActive = studyGroupId === studyGroup.studyGroupId && !isUseSelfSchedule;

                    return (
                        <div
                            key={studyGroup.studyGroupId}
                            onClick={() =>
                                handleNextStepAction({
                                    stepId: CHOOSE_SELF_SCHEDULE_STEP,
                                    formValue: {
                                        studyGroupId: studyGroup.studyGroupId,
                                        studyGroupDetail: studyGroup,
                                        isUseSelfSchedule: false,
                                    },
                                })
                            }
                            className={cn(
                                'basis-full md:basis-2/5 p-4 rounded-lg outline-2 outline w-full cursor-pointer transition-all duration-300',
                                'bg-secondary outline-[#E2E8F0] hover:outline-primary',
                                {
                                    'outline-primary border-primary': isActive,
                                }
                            )}
                        >
                            {/* Header */}
                            <div className="flex gap-4 items-start">
                                <Image
                                    src={studyGroup.teacherTeamMemberPhoto || '/levels/3.svg'}
                                    className="border-2 border-primary rounded-md"
                                    alt={studyGroup.teacherTeamMemberName}
                                    width={60}
                                    height={60}
                                />

                                <div className="flex items-start justify-between gap-2 w-full">
                                    <div className="space-y-2 text-left">
                                        <div>
                                            <p className="text-white text-xs">Nama Kelompok:</p>
                                            <p className="text-white text-lg font-medium">
                                                {studyGroup.studyGroupName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white text-xs">Nama Guru:</p>
                                            <p className="text-white text-lg font-medium">
                                                {studyGroup.teacherTeamMemberName}
                                            </p>
                                        </div>
                                    </div>
                                    {isActive && (
                                        <div className="size-8 rounded-full bg-primary text-primary font-semibold text-xs"></div>
                                    )}
                                </div>
                            </div>

                            {/* Jadwal */}
                            <div
                                className={cn('grid grid-cols-6 w-full mt-2 p-2 rounded-lg gap-1', {
                                    'bg-primary': isActive,
                                    'bg-white': !isActive,
                                })}
                            >
                                {days.map((day, idx) => {
                                    const isAvailable =
                                        day === studyGroup.schedule1.dayOfWeek ||
                                        day === studyGroup.schedule2.dayOfWeek;

                                    return (
                                        <div
                                            key={day}
                                            className="col-span-1 flex flex-col items-center"
                                        >
                                            <p
                                                className={cn('font-medium', {
                                                    'text-neutral-200': !isAvailable && !isActive,
                                                    'text-primary/10': !isAvailable && isActive,
                                                    'text-[#020817]': isAvailable && !isActive,
                                                    'text-white': isAvailable && isActive,
                                                })}
                                            >
                                                {dayNames[idx]}
                                            </p>

                                            <div className="flex flex-col gap-3 items-center">
                                                {day === studyGroup.schedule1.dayOfWeek &&
                                                    renderScheduleTime(
                                                        studyGroup.schedule1,
                                                        isActive
                                                    )}
                                                {day === studyGroup.schedule2.dayOfWeek &&
                                                    renderScheduleTime(
                                                        studyGroup.schedule2,
                                                        isActive
                                                    )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudyGroupComponent;
