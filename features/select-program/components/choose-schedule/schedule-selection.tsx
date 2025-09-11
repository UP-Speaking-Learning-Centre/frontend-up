import { mentors } from '@/app/(landing)/about/page';
import { Button } from '@/components/ui/button';
import { CHOOSE_SCHEDULE_STEP, DAY, END_TIME, START_TIME } from '@/constants/program-selections';
import { renderDayToIndonesian } from '@/lib/moment';
import { cn } from '@/lib/utils';
import { DayOfWeekType } from '@/types/programs-selection';
import { Calendar, Clock, MapPinHouse, X } from 'lucide-react';
import moment from 'moment';
import 'moment/locale/id';
import React, { useMemo } from 'react';
import useProgramSelection from '../../hooks/use-program-selection';
import useFetchAvailableScheduleQuery from '../../queries/use-fetch-available-schedule';
import useFetchLocationsQuery from '../../queries/use-fetch-locations';
import useProgramSelectionStore from '../../stores/program-selection-store';
import MentorImage from './mentor-image';

const CHOOSE_LOCATION_STEP = 'choose-location';
const CHOOSE_DAY_STEP = 'choose-day';
const CHOOSE_TIME_STEP = 'choose-time';
const CHOOSE_MENTOR_STEP = 'choose-mentor';
const CHOOSE_SECOND_DAY_STEP = 'choose-second-day';
const CHOOSE_SECOND_TIME_STEP = 'choose-second-time';
const CHOOSE_SECOND_MENTOR_STEP = 'choose-second-mentor';

const steps = [
    CHOOSE_LOCATION_STEP,
    CHOOSE_DAY_STEP,
    CHOOSE_TIME_STEP,
    CHOOSE_MENTOR_STEP,
    CHOOSE_SECOND_DAY_STEP,
    CHOOSE_SECOND_TIME_STEP,
    CHOOSE_SECOND_MENTOR_STEP,
];

const ScheduleSelection = () => {
    const { data } = useFetchAvailableScheduleQuery();
    const { data: locations } = useFetchLocationsQuery();
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const setFirstSessionSchedule = useProgramSelectionStore(s => s.setFirstSessionSchedule);
    const setSecondSessionSchedule = useProgramSelectionStore(s => s.setSecondSessionSchedule);
    const { handleNextStepAction } = useProgramSelection();
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { schedule, locationName } = formValue;
    const { firstSession, secondSession } = schedule;
    const [currentStep, setCurrentStep] = React.useState(0);

    const getCurrentStepIndex = (stepId: (typeof steps)[number]) => {
        return steps.findIndex(step => step === stepId);
    };

    const onClickStep = (stepId: (typeof steps)[number]) => {
        const nextStep = getCurrentStepIndex(stepId) + 1;
        setCurrentStep(nextStep);
        scrollToStep(stepId);
    };

    const availableScheduleByTeacher = useMemo(() => {
        return data?.filter(item => item.teacherMemberId === firstSession.teacherMemberId);
    }, [data, firstSession.teacherMemberId]);

    const availableScheduleByTeacherSecondSession = useMemo(() => {
        return availableScheduleByTeacher?.filter(
            item => item.dayOfWeek === secondSession.dayOfWeek
        );
    }, [availableScheduleByTeacher, secondSession.dayOfWeek]);

    const scrollToStep = (stepId: (typeof steps)[number]) => {
        const currentStepElement = document.getElementById(steps[currentStep]);
        const stepElement = document.getElementById(stepId);
        var headerOffset = 100;

        setTimeout(() => {
            if (stepElement) {
                var elementPosition = stepElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            } else if (currentStepElement) {
                const bottom = currentStepElement.getBoundingClientRect().bottom;
                const offsetPosition = window.pageYOffset + bottom - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }, 100);
    };

    const renderLocation = () => {
        return (
            <div className="mx-auto" id={CHOOSE_LOCATION_STEP}>
                <p className="text-center text-[#020817] font-medium">Pilih Cabang</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {locations?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setFormValue({
                                        locationName: item.locationName,
                                        locationId: item.locationId,
                                    });
                                    onClickStep(CHOOSE_LOCATION_STEP);
                                }}
                                className={cn(
                                    'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] p-4 rounded-lg gap-4',
                                    'hover:border-[#CE6439]',
                                    locationName === item.locationName && 'border-[#CE6439]'
                                )}
                            >
                                <MapPinHouse className="size-4 text-[#4B5563]" />
                                <p className="text-sm">Cabang {item.locationName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };
    const renderDays = () => {
        if (!locationName) return null;

        return (
            <div className="mx-auto" id={CHOOSE_DAY_STEP}>
                <p className="text-center text-[#020817] font-medium">Pilih Hari</p>
                <div className="grid grid-cols-6 mx-auto gap-4 mt-3">
                    {DAY.map(day => {
                        return (
                            <div
                                key={day}
                                onClick={() => {
                                    setFirstSessionSchedule({ dayOfWeek: day as DayOfWeekType });
                                    onClickStep(CHOOSE_DAY_STEP);
                                }}
                                className={cn(
                                    'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] px-4 py-3 rounded-lg gap-4',
                                    'hover:border-[#CE6439]',
                                    firstSession.dayOfWeek === day && 'border-[#CE6439]'
                                )}
                            >
                                <div className="flex items-center justify-center size-8 rounded-full shrink-0 bg-[#E5E7EB]">
                                    <Calendar className="size-4 text-[#4B5563]" />
                                </div>
                                <p className="text-sm">{renderDayToIndonesian(day)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderTime = () => {
        if (!firstSession.dayOfWeek) return null;

        return (
            <div className="mx-auto" id={CHOOSE_TIME_STEP}>
                <p className="text-center text-[#020817] font-medium">Pilih Waktu</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {START_TIME.map((time, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setFirstSessionSchedule({
                                        startTime: time,
                                        endTime: END_TIME[i],
                                        teacherMemberId: -1,
                                        teacherScheduleId: -1,
                                        teacherMemberName: '',
                                    });
                                    setSecondSessionSchedule({
                                        startTime: '',
                                        endTime: '',
                                        dayOfWeek: '',
                                        teacherMemberId: -1,
                                        teacherScheduleId: -1,
                                        teacherMemberName: '',
                                    });
                                    onClickStep(CHOOSE_TIME_STEP);
                                }}
                                className={cn(
                                    'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] p-4 rounded-lg gap-4',
                                    'hover:border-[#CE6439]',
                                    firstSession.startTime === time && 'border-[#CE6439]'
                                )}
                            >
                                <div className="flex items-center justify-center size-8 rounded-full shrink-0 bg-[#E5E7EB]">
                                    <Clock className="size-4 text-[#4B5563]" />
                                </div>
                                <p className="text-sm">
                                    {moment(time, 'HH:mm').format('HH:mm')} -{' '}
                                    {moment(END_TIME[i], 'HH:mm').format('HH:mm')}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMentor = () => {
        if (!firstSession.dayOfWeek || !firstSession.startTime || !firstSession.endTime) {
            return null;
        }

        const availableMentor = data?.filter(
            item =>
                item.dayOfWeek === firstSession.dayOfWeek &&
                item.startTime === firstSession.startTime &&
                formValue.taughtBy.includes(item.teacherAlias)
        );

        console.log(availableMentor);
        return (
            <div className="mx-auto max-w-7xl" id={CHOOSE_MENTOR_STEP}>
                <p className="text-center text-[#020817] font-medium">
                    Pilih mentor yang tersedia di{' '}
                    <span className="font-bold text-[#CE6439]">Cabang {locationName}</span>, pada
                    hari{' '}
                    <span className="font-bold text-[#CE6439]">
                        {renderDayToIndonesian(firstSession.dayOfWeek as string)}
                    </span>
                    , jam{' '}
                    <span className="font-bold text-[#CE6439]">
                        {moment(firstSession.startTime, 'HH:mm').format('HH:mm')} -{' '}
                        {moment(firstSession.endTime, 'HH:mm').format('HH:mm')}
                    </span>
                </p>

                <div className="grid grid-cols-3 mx-auto  gap-4 mt-3">
                    {!availableMentor || availableMentor?.length === 0 ? (
                        <div className="text-center font-semibold col-start-2 mt-8 text-lg">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <X className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-red-600">Tidak ada mentor yang tersedia</p>
                        </div>
                    ) : (
                        <>
                            {availableMentor?.map((item, i) => {
                                const mentor = mentors.find(
                                    m => m.nameWithoutDegree === item.teacherMemberName
                                );

                                return (
                                    <div
                                        key={mentor?.name}
                                        onClick={() => {
                                            setFirstSessionSchedule({
                                                teacherMemberId: item.teacherMemberId,
                                                teacherMemberName: item.teacherMemberName,
                                                teacherScheduleId: item.scheduleId,
                                            });
                                            setSecondSessionSchedule({
                                                teacherMemberId: item.teacherMemberId,
                                                teacherMemberName: item.teacherMemberName,
                                            });
                                            onClickStep(CHOOSE_MENTOR_STEP);
                                        }}
                                        className={cn(
                                            'col-span-1 bg-[#FFFFFF] border-2 gap-4 group rounded-md overflow-hidden',
                                            'hover:border-[#CE6439]',
                                            firstSession.teacherMemberId === item.teacherMemberId &&
                                                'border-[#CE6439]'
                                        )}
                                    >
                                        <MentorImage
                                            mentor={{
                                                name: item.teacherMemberName,
                                                role: mentor?.role || '',
                                                bio: mentor?.bio || '',
                                                imageUrl: mentor?.imageUrl || '',
                                            }}
                                        />
                                        <p
                                            className={cn(
                                                'text-lg cursor-pointer relative flex items-center justify-center text-center p-4 w-full'
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'relative z-20',
                                                    firstSession.teacherMemberId ===
                                                        item.teacherMemberId &&
                                                        'after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-primary after:content-[""]'
                                                )}
                                            >
                                                {item.teacherMemberName}
                                            </span>
                                        </p>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderSecondSessionTitle = () => {
        if (!firstSession.teacherMemberName) return null;

        return (
            <p className="text-center text-[#020817] font-medium" id={CHOOSE_SECOND_DAY_STEP}>
                Pilih jadwal untuk sesi kedua pada bersama{' '}
                <span className="font-bold text-[#CE6439]">{firstSession.teacherMemberName}</span>
            </p>
        );
    };

    const renderSecondDay = () => {
        if (!firstSession.teacherMemberName) return null;

        return (
            <div className="mx-auto">
                <p className="text-center text-[#020817] font-medium">Pilih Hari</p>
                <div className="grid grid-cols-6 mx-auto gap-4 mt-3">
                    {DAY.map(day => {
                        const isDisabled =
                            day === firstSession.dayOfWeek ||
                            (availableScheduleByTeacher &&
                                !availableScheduleByTeacher.find(item => item.dayOfWeek === day));

                        return (
                            <div
                                key={day}
                                onClick={() => {
                                    if (!isDisabled) {
                                        setSecondSessionSchedule({
                                            dayOfWeek: day as DayOfWeekType,
                                        });
                                        onClickStep(CHOOSE_SECOND_DAY_STEP);
                                    }
                                }}
                                className={cn(
                                    'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] px-4 py-3 rounded-lg gap-4',
                                    isDisabled
                                        ? 'cursor-not-allowed opacity-30'
                                        : 'hover:border-[#CE6439]',
                                    secondSession.dayOfWeek === day && 'border-[#CE6439]'
                                )}
                            >
                                <div className="flex items-center justify-center size-8 rounded-full shrink-0 bg-[#E5E7EB]">
                                    <Calendar className="size-4 text-[#4B5563]" />
                                </div>
                                <p className="text-sm">{renderDayToIndonesian(day)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderSecondTime = () => {
        if (!secondSession.dayOfWeek) return null;

        return (
            <div className="mx-auto" id={CHOOSE_SECOND_TIME_STEP}>
                <p className="text-center text-[#020817] font-medium">Pilih Waktu</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {START_TIME.map((time, i) => {
                        const currentSchedule = availableScheduleByTeacherSecondSession?.find(
                            item => item.startTime === time
                        );
                        const isDisabled = !currentSchedule;

                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    if (!isDisabled) {
                                        setSecondSessionSchedule({
                                            startTime: time,
                                            endTime: END_TIME[i],
                                            teacherScheduleId: currentSchedule?.scheduleId,
                                        });
                                        onClickStep(CHOOSE_SECOND_TIME_STEP);
                                    }
                                }}
                                className={cn(
                                    'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] p-4 rounded-lg gap-4',
                                    isDisabled
                                        ? 'cursor-not-allowed opacity-30'
                                        : 'hover:border-[#CE6439]',
                                    secondSession.startTime === time && 'border-[#CE6439]'
                                )}
                            >
                                <div className="flex items-center justify-center size-8 rounded-full shrink-0 bg-[#E5E7EB]"></div>
                                <p className="text-sm">
                                    {moment(time, 'HH:mm').format('HH:mm')} -{' '}
                                    {moment(END_TIME[i], 'HH:mm').format('HH:mm')}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderNextButton = () => {
        if (
            !firstSession.dayOfWeek ||
            !firstSession.startTime ||
            !firstSession.endTime ||
            !secondSession.dayOfWeek ||
            !secondSession.startTime ||
            !secondSession.endTime
        ) {
            return null;
        }

        return (
            <div className="mt-6 flex items-center w-full justify-center">
                <Button
                    onClick={() =>
                        handleNextStepAction({ stepId: CHOOSE_SCHEDULE_STEP, formValue: {} })
                    }
                >
                    Lihat Rangkuman Program
                </Button>
            </div>
        );
    };

    return (
        <div className="mt-10 flex flex-col gap-20">
            {renderLocation()}
            {renderDays()}
            {renderTime()}
            {renderMentor()}
            {renderSecondSessionTitle()}
            {renderSecondDay()}
            {renderSecondTime()}
            {renderNextButton()}
        </div>
    );
};

export default ScheduleSelection;
