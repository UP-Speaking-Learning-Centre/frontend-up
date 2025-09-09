import React, { useMemo } from 'react';
import useFetchAvailableScheduleQuery from '../../queries/use-fetch-available-schedule';
import moment from 'moment';
import { DAY, END_TIME, GROUP_INFORMATION_STEP, START_TIME } from '@/constants/program-selections';
import 'moment/locale/id';
import { Calendar, Clock, MapPinHouse, PinIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { DayOfWeekType } from '@/types/programs-selection';
import { renderDayToIndonesian } from '@/lib/moment';
import useFetchLocationsQuery from '../../queries/use-fetch-locations';
import { Button } from '@/components/ui/button';
import useProgramSelection from '../../hooks/use-program-selection';

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

    const availableScheduleByTeacher = useMemo(() => {
        return data?.filter(item => item.teacherMemberId === firstSession.teacherMemberId);
    }, [data, firstSession.teacherMemberId]);

    const availableScheduleByTeacherSecondSession = useMemo(() => {
        return availableScheduleByTeacher?.filter(
            item => item.dayOfWeek === secondSession.dayOfWeek
        );
    }, [availableScheduleByTeacher, secondSession.dayOfWeek]);

    const renderLocation = () => {
        return (
            <div className="mx-auto">
                <p className="text-center text-[#020817] font-medium">Pilih Cabang</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {locations?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    setFormValue({
                                        locationName: item.locationName,
                                        locationId: item.locationId,
                                    })
                                }
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
            <div className="mx-auto">
                <p className="text-center text-[#020817] font-medium">Pilih Hari</p>
                <div className="grid grid-cols-6 mx-auto gap-4 mt-3">
                    {DAY.map(day => {
                        return (
                            <div
                                key={day}
                                onClick={() =>
                                    setFirstSessionSchedule({ dayOfWeek: day as DayOfWeekType })
                                }
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
            <div className="mx-auto">
                <p className="text-center text-[#020817] font-medium">Pilih Waktu</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {START_TIME.map((time, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    setFirstSessionSchedule({
                                        startTime: time,
                                        endTime: END_TIME[i],
                                    })
                                }
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

        return (
            <div className="mx-auto">
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

                <div className="grid grid-cols-2 mx-auto gap-4 mt-3">
                    {data
                        ?.filter(
                            item =>
                                item.dayOfWeek === firstSession.dayOfWeek &&
                                item.startTime === firstSession.startTime &&
                                formValue.taughtBy.includes(item.alias)
                        )
                        .map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setFirstSessionSchedule({
                                            teacherMemberId: item.teacherMemberId,
                                            teacherMemberName: item.teacherMemberName,
                                            teacherScheduleId: item.scheduleId,
                                        });
                                        setSecondSessionSchedule({
                                            teacherMemberId: item.teacherMemberId,
                                            teacherMemberName: item.teacherMemberName,
                                            teacherScheduleId: item.scheduleId,
                                        });
                                    }}
                                    className={cn(
                                        'flex items-center cursor-pointer justify-center col-span-1 bg-[#FFFFFF] border-2 border-[#E2E8F0] p-4 rounded-lg gap-4',
                                        'hover:border-[#CE6439]',
                                        firstSession.teacherMemberId === item.teacherMemberId &&
                                            'border-[#CE6439]'
                                    )}
                                >
                                    <div className="flex items-center justify-center size-8 rounded-full shrink-0 bg-[#E5E7EB]"></div>
                                    <p className="text-sm">{item.teacherMemberName}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    };

    const renderSecondSessionTitle = () => {
        if (!firstSession.teacherMemberName) return null;

        return (
            <p className="text-center text-[#020817] font-medium">
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
                                onClick={() =>
                                    !isDisabled &&
                                    setSecondSessionSchedule({ dayOfWeek: day as DayOfWeekType })
                                }
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
            <div className="mx-auto">
                <p className="text-center text-[#020817] font-medium">Pilih Waktu</p>
                <div className="grid grid-cols-3 mx-auto gap-4 mt-3">
                    {START_TIME.map((time, i) => {
                        const isDisabled = !availableScheduleByTeacherSecondSession?.find(
                            item => item.startTime === time
                        );

                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    !isDisabled &&
                                    setSecondSessionSchedule({
                                        startTime: time,
                                        endTime: END_TIME[i],
                                    })
                                }
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
                        handleNextStepAction({ stepId: GROUP_INFORMATION_STEP, formValue: {} })
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
        </div>
    );
};

export default ScheduleSelection;
