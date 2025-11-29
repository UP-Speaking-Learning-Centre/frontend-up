import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller, useForm } from 'react-hook-form';
import SelectProgram from './select-program';
import SelectPackage from './select-package';
import SelectGrade from './select-grade';
import SelectTeacher from './select-teacher';
import SelectLocation from './select-location';
import SelectGroup from './select-group';
import SelectLevel from './select-level';
import { InitialValue, useNewStudyGroupStore } from '../../stores/new-study-group-store';
import useFetchGradesQuery from '@/features/select-program/queries/use-fetch-grades';
import { useGetTeacherScheduleQuery } from '../../queries/use-get-teacher-schedule';
import { SelectDayOne, SelectTimeOne } from './select-schedule-one';
import { useEffect, useState } from 'react';
import {
    SelectDayThree,
    SelectDayTwo,
    SelectTimeThree,
    SelectTimeTwo,
} from './select-schedule-two';
import { useCreateNewStudyGroupMutation } from '../../queries/use-create-new-study-group';
import { getSchedulesByTeacherAndDay, isTimeAvailable } from '@/utils/schedule';
import { ScheduleItem } from '@/types/schedule';
import { TimerIcon, X, XCircle } from 'lucide-react';
import moment from 'moment';

const AddNewStudyGroup = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) => {
    const formValue = useNewStudyGroupStore(s => s.formValue);
    const { data: scheduleData } = useGetTeacherScheduleQuery(true);
    const setValue = useNewStudyGroupStore(s => s.setValue);
    const resetFormValue = useNewStudyGroupStore(s => s.resetFormValue);
    const resetAll = useNewStudyGroupStore(s => s.resetAll);
    const { mutate, isPending } = useCreateNewStudyGroupMutation();

    const [errorTime, setErrorTime] = useState({
        time1: '',
        time2: '',
        time3: '',
    });

    const [teachersScheduleDay1, setTeachersScheduleDay1] = useState<ScheduleItem[] | null>(null);
    const [teachersScheduleDay2, setTeachersScheduleDay2] = useState<ScheduleItem[] | null>(null);
    const [teachersScheduleDay3, setTeachersScheduleDay3] = useState<ScheduleItem[] | null>(null);

    const [showSchedule3, setShowSchedule3] = useState(false);

    useEffect(() => {
        if (formValue.teacherMemberName && formValue.day1 && !!scheduleData?.length) {
            const schedules = getSchedulesByTeacherAndDay(
                scheduleData,
                String(formValue.teacherTeamMemberId),
                formValue.day1
            );

            setTeachersScheduleDay1(schedules);
        }
    }, [formValue.teacherMemberName, formValue.day1, scheduleData]);

    useEffect(() => {
        if (formValue.teacherMemberName && formValue.day2 && !!scheduleData?.length) {
            const schedules = getSchedulesByTeacherAndDay(
                scheduleData,
                String(formValue.teacherTeamMemberId),
                formValue.day2
            );
            setTeachersScheduleDay2(schedules);
        }
    }, [formValue.teacherMemberName, formValue.day2, scheduleData]);

    useEffect(() => {
        if (formValue.teacherMemberName && formValue.day3 && !!scheduleData?.length) {
            const schedules = getSchedulesByTeacherAndDay(
                scheduleData,
                String(formValue.teacherTeamMemberId),
                formValue.day3
            );
            setTeachersScheduleDay3(schedules);
        }
    }, [formValue.teacherMemberName, formValue.day3, scheduleData]);

    const onSubmit = (data: InitialValue) => {
        mutate(data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    const form = useForm({
        defaultValues: formValue,
    });

    const { handleSubmit, control } = form;

    const { data: gradeData } = useFetchGradesQuery(true);

    const onChange = (key: keyof InitialValue, data: any) => {
        resetFormValue(key);
        setValue({
            [key]: data,
            ...(key === 'gradeId'
                ? {
                      alias: gradeData
                          ?.find(grade => grade.id === data)
                          ?.taughtBy.map(taughtBy => taughtBy.name),
                  }
                : {}),
            ...(key === 'teacherMemberName'
                ? {
                      teacherTeamMemberId: scheduleData?.find(
                          schedule => schedule.teacherMemberName === data
                      )?.teacherMemberId,
                  }
                : {}),
        });
    };

    useEffect(() => {
        if (formValue.day1 && formValue.time1 && formValue.teacherTeamMemberId) {
            const getScheduleid = scheduleData?.find(
                schedule =>
                    schedule.day === formValue.day1 &&
                    schedule.startTime === formValue.time1 &&
                    Number(schedule.teacherMemberId) === Number(formValue.teacherTeamMemberId)
            );

            if (getScheduleid) {
                onChange('scheduleId1', getScheduleid.scheduleId);
            }
        }
    }, [formValue.day1, formValue.time1, formValue.teacherTeamMemberId]);

    useEffect(() => {
        if (formValue.day2 && formValue.time2 && formValue.teacherTeamMemberId) {
            const getScheduleid = scheduleData?.find(
                schedule =>
                    schedule.day === formValue.day2 &&
                    schedule.startTime === formValue.time2 &&
                    Number(schedule.teacherMemberId) === Number(formValue.teacherTeamMemberId)
            );

            if (getScheduleid) {
                onChange('scheduleId2', getScheduleid.scheduleId);
            }
        }
    }, [formValue.day2, formValue.time2, formValue.teacherTeamMemberId]);

    useEffect(() => {
        if (formValue.day3 && formValue.time3 && formValue.teacherTeamMemberId) {
            const getScheduleid = scheduleData?.find(
                schedule =>
                    schedule.day === formValue.day3 &&
                    schedule.startTime === formValue.time3 &&
                    Number(schedule.teacherMemberId) === Number(formValue.teacherTeamMemberId)
            );

            if (getScheduleid) {
                onChange('scheduleId3', getScheduleid.scheduleId);
            }
        }
    }, [formValue.day3, formValue.time3, formValue.teacherTeamMemberId]);

    const disabled =
        !formValue.title ||
        !formValue.description ||
        !formValue.programId ||
        !formValue.groupId ||
        !formValue.gradeId ||
        !formValue.teacherMemberName ||
        !formValue.day1 ||
        !formValue.time1 ||
        !formValue.day2 ||
        !formValue.time2 ||
        (!formValue.isCustomTime1 ? !formValue.scheduleId1 : false) ||
        (!formValue.isCustomTime2 ? !formValue.scheduleId2 : false) ||
        (showSchedule3 && (!formValue.isCustomTime3 ? !formValue.scheduleId3 : false)) ||
        !!errorTime.time1 ||
        !!errorTime.time2 ||
        !!errorTime.time3;

    const onCheckTime = ({
        teachersSchedule,
        startTime,
        time,
    }: {
        teachersSchedule: ScheduleItem[];
        startTime: string;
        time: 'time1' | 'time2' | 'time3';
    }) => {
        const { isAvailable, overlapped } = isTimeAvailable(teachersSchedule, startTime);

        const start = moment(startTime, 'HH:mm:ss');
        const min = moment('08:00:00', 'HH:mm:ss');
        const max = moment('20:00:00', 'HH:mm:ss');

        let message = '';

        if (!isAvailable) {
            message = `Teacher sudah punya jadwal dari ${overlapped?.startTime} sampai ${overlapped?.endTime}`;
        }

        if (!message && start.isAfter(max)) {
            message = 'Waktu mulai kelas maksimal jam 20:00';
        }

        if (!message && start.isBefore(min)) {
            message = 'Waktu mulai kelas minimal jam 08:00';
        }

        setErrorTime({
            ...errorTime,
            [time]: message,
        });
    };

    useEffect(() => {
        if (formValue.time1) {
            onCheckTime({
                teachersSchedule: teachersScheduleDay1 || [],
                startTime: formValue.time1,
                time: 'time1',
            });
        }
    }, [formValue.time1, teachersScheduleDay1]);

    useEffect(() => {
        if (formValue.time2) {
            const day1 = {
                scheduleId: 0,
                teacherMemberName: '',
                teacherAlias: '',
                teacherMemberId: '',
                day: '',
                startTime: formValue.time1,
                endTime: moment(formValue.time1, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
                isPriority: false,
                location: '',
                package: null,
                studyGroupId: null,
                studyGroup: '',
                totalStudent: 0,
                notes: [],
            };

            onCheckTime({
                teachersSchedule: [...(teachersScheduleDay2 || []), day1],
                startTime: formValue.time2,
                time: 'time2',
            });
        }
    }, [formValue.time2, formValue.time1, teachersScheduleDay2]);

    useEffect(() => {
        if (formValue.time3) {
            const day1 = {
                scheduleId: 0,
                teacherMemberName: '',
                teacherAlias: '',
                teacherMemberId: '',
                day: '',
                startTime: formValue.time1,
                endTime: moment(formValue.time1, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
                isPriority: false,
                location: '',
                package: null,
                studyGroupId: null,
                studyGroup: '',
                totalStudent: 0,
                notes: [],
            };

            const day2 = {
                scheduleId: 0,
                teacherMemberName: '',
                teacherAlias: '',
                teacherMemberId: '',
                day: '',
                startTime: formValue.time2,
                endTime: moment(formValue.time2, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
                isPriority: false,
                location: '',
                package: null,
                studyGroupId: null,
                studyGroup: '',
                totalStudent: 0,
                notes: [],
            };

            onCheckTime({
                teachersSchedule: [...(teachersScheduleDay3 || []), day1, day2],
                startTime: formValue.time3,
                time: 'time3',
            });
        }
    }, [formValue.time3, formValue.time2, formValue.time1, teachersScheduleDay3]);

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={() => {
                    setOpen(false);
                    resetAll();
                }}
            >
                <DialogContent className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                    <DialogTitle>Tambah Kelompok Belajar</DialogTitle>
                    <form className="space-y-4" onSubmit={handleSubmit(data => onSubmit(data))}>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <div>
                                    <Label>Nama Kelompok*</Label>
                                    <Input
                                        className="mt-1"
                                        value={formValue.title}
                                        onChange={e => {
                                            onChange('title', e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <div>
                                    <Label>Deskripsi*</Label>
                                    <Input
                                        className="mt-1"
                                        value={formValue.description}
                                        onChange={e => {
                                            onChange('description', e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="programId"
                            render={({ field }) => (
                                <SelectProgram
                                    value={formValue.programId}
                                    onChange={value => {
                                        onChange('programId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="groupId"
                            render={({ field }) => {
                                return (
                                    <SelectGroup
                                        value={formValue.groupId}
                                        onChange={value => {
                                            onChange('groupId', value);
                                            field.onChange(value);
                                        }}
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={control}
                            name="levelId"
                            render={({ field }) => (
                                <SelectLevel
                                    value={formValue.levelId}
                                    onChange={value => {
                                        onChange('levelId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="gradeId"
                            render={({ field }) => (
                                <SelectGrade
                                    value={formValue.gradeId}
                                    onChange={value => {
                                        onChange('gradeId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="packageId"
                            render={({ field }) => (
                                <SelectPackage
                                    value={formValue.packageId}
                                    onChange={value => {
                                        onChange('packageId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="locationId"
                            render={({ field }) => (
                                <SelectLocation
                                    value={formValue.locationId}
                                    onChange={value => {
                                        onChange('locationId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="teacherTeamMemberId"
                            render={({ field }) => (
                                <SelectTeacher
                                    value={formValue.teacherMemberName}
                                    onChange={value => {
                                        onChange('teacherMemberName', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <div>
                            <div className="flex items-center justify-between">
                                <Label>Jadwal 1*</Label>
                                <Button
                                    variant="link"
                                    type="button"
                                    onClick={() => {
                                        resetFormValue('time1');
                                        setValue({
                                            time1: '',
                                            isCustomTime1: !formValue.isCustomTime1,
                                        });

                                        setErrorTime({
                                            time1: '',
                                            time2: '',
                                            time3: '',
                                        });
                                    }}
                                >
                                    {formValue.isCustomTime1
                                        ? 'Gunakan Jadwal Biasa'
                                        : 'Pilih Jadwal Custom'}
                                </Button>
                            </div>
                            <div className="flex gap-4 w-full">
                                <Controller
                                    control={control}
                                    name="day1"
                                    render={({ field }) => (
                                        <SelectDayOne
                                            value={formValue.day1}
                                            onChange={value => {
                                                setErrorTime({
                                                    time1: '',
                                                    time2: '',
                                                    time3: '',
                                                });
                                                onChange('day1', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time1"
                                    render={({ field }) =>
                                        formValue.isCustomTime1 ? (
                                            <div className="relative flex-1 w-full">
                                                <Label className="font-normal">Waktu</Label>
                                                <div className="relative flex-1 mt-1">
                                                    {!formValue.day1 ? (
                                                        <p className="mt-4 text-xs">
                                                            Pilih hari terlebih dahulu
                                                        </p>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 w-full">
                                                                <TimerIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500" />
                                                                <Input
                                                                    onChange={e =>
                                                                        onChange(
                                                                            'time1',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="time"
                                                                    id="time-picker"
                                                                    value={formValue.time1}
                                                                    step="60"
                                                                    className="bg-background ps-8 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                                />
                                                            </div>
                                                            <p className="text-sm text-neutral-500">
                                                                s/d
                                                            </p>
                                                            <p className="w-fit font-medium text-base pr-2">
                                                                {formValue.time1
                                                                    ? moment(
                                                                          formValue.time1,
                                                                          'HH:mm:ss'
                                                                      )
                                                                          .add(90, 'minutes')
                                                                          .format('HH:mm')
                                                                    : '__:__'}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <SelectTimeOne
                                                value={formValue.time1}
                                                onChange={value => {
                                                    onChange('time1', value);
                                                    field.onChange(value);
                                                }}
                                            />
                                        )
                                    }
                                />
                            </div>
                            <p className="text-red-500 mt-2 text-sm">{errorTime.time1}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label>Jadwal 2*</Label>
                                <Button
                                    variant="link"
                                    type="button"
                                    onClick={() => {
                                        setValue({
                                            time2: '',
                                            isCustomTime2: !formValue.isCustomTime2,
                                        });
                                        resetFormValue('time2');
                                        setErrorTime(prev => ({
                                            ...prev,
                                            time2: '',
                                            time3: '',
                                        }));
                                    }}
                                >
                                    {formValue.isCustomTime2
                                        ? 'Gunakan Jadwal Biasa'
                                        : 'Pilih Jadwal Custom'}
                                </Button>
                            </div>
                            <div className="flex gap-4 w-full">
                                <Controller
                                    control={control}
                                    name="day2"
                                    render={({ field }) => (
                                        <SelectDayTwo
                                            value={formValue.day2}
                                            onChange={value => {
                                                setErrorTime(prev => ({
                                                    ...prev,
                                                    time2: '',
                                                    time3: '',
                                                }));
                                                onChange('day2', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time2"
                                    render={({ field }) =>
                                        formValue.isCustomTime2 ? (
                                            <div className="relative flex-1 w-full">
                                                <Label className="font-normal">Waktu</Label>
                                                <div className="relative flex-1 mt-1">
                                                    {!formValue.day2 ? (
                                                        <p className="mt-4 text-xs">
                                                            Pilih hari terlebih dahulu
                                                        </p>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 w-full">
                                                                <TimerIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500" />
                                                                <Input
                                                                    onChange={e =>
                                                                        onChange(
                                                                            'time2',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="time"
                                                                    value={formValue.time2}
                                                                    id="time-picker"
                                                                    step="60"
                                                                    className="bg-background ps-8 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                                />
                                                            </div>
                                                            <p className="text-sm text-neutral-500">
                                                                s/d
                                                            </p>
                                                            <p className="w-fit font-medium text-base pr-2">
                                                                {formValue.time2
                                                                    ? moment(
                                                                          formValue.time2,
                                                                          'HH:mm:ss'
                                                                      )
                                                                          .add(90, 'minutes')
                                                                          .format('HH:mm')
                                                                    : '__:__'}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <SelectTimeTwo
                                                value={formValue.time2}
                                                onChange={value => {
                                                    onChange('time2', value);
                                                    field.onChange(value);
                                                }}
                                            />
                                        )
                                    }
                                />
                            </div>
                            <p className="text-red-500 mt-2 text-sm">{errorTime.time2}</p>
                        </div>

                        {!showSchedule3 && formValue.programId === '2' && (
                            <div className="mt-2">
                                <Button
                                    variant="link"
                                    className="px-0"
                                    type="button"
                                    onClick={() => {
                                        setShowSchedule3(true);
                                    }}
                                >
                                    + Tambahkan jadwal 3
                                </Button>
                            </div>
                        )}

                        {showSchedule3 && (
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Label>Jadwal 3*</Label>
                                        <XCircle
                                            onClick={() => {
                                                setShowSchedule3(false);
                                                resetFormValue('day3');
                                                setValue({
                                                    isCustomTime3: !formValue.isCustomTime3,
                                                });
                                                setErrorTime(prev => ({
                                                    ...prev,
                                                    time3: '',
                                                }));
                                            }}
                                            className="ml-2 text-primary size-4 cursor-pointer"
                                        />
                                    </div>
                                    <Button
                                        variant="link"
                                        type="button"
                                        onClick={() => {
                                            setValue({
                                                time3: '',
                                                isCustomTime3: !formValue.isCustomTime3,
                                            });
                                            resetFormValue('time3');
                                            setErrorTime(prev => ({
                                                ...prev,
                                                time3: '',
                                            }));
                                        }}
                                    >
                                        {formValue.isCustomTime3
                                            ? 'Gunakan Jadwal Biasa'
                                            : 'Pilih Jadwal Custom'}
                                    </Button>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <Controller
                                        control={control}
                                        name="day3"
                                        render={({ field }) => (
                                            <SelectDayThree
                                                value={formValue.day3}
                                                onChange={value => {
                                                    setErrorTime(prev => ({
                                                        ...prev,
                                                        time3: '',
                                                    }));
                                                    onChange('day3', value);
                                                    field.onChange(value);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="time3"
                                        render={({ field }) =>
                                            formValue.isCustomTime3 ? (
                                                <div className="relative flex-1 w-full">
                                                    <Label className="font-normal">Waktu</Label>
                                                    <div className="relative flex-1 mt-1">
                                                        {!formValue.day3 ? (
                                                            <p className="mt-4 text-xs">
                                                                Pilih hari terlebih dahulu
                                                            </p>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1 w-full">
                                                                    <TimerIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500" />
                                                                    <Input
                                                                        onChange={e =>
                                                                            onChange(
                                                                                'time3',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        type="time"
                                                                        value={formValue.time3}
                                                                        id="time-picker"
                                                                        step="60"
                                                                        className="bg-background ps-8 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                                    />
                                                                </div>
                                                                <p className="text-sm text-neutral-500">
                                                                    s/d
                                                                </p>
                                                                <p className="w-fit font-medium text-base pr-2">
                                                                    {formValue.time3
                                                                        ? moment(
                                                                              formValue.time3,
                                                                              'HH:mm:ss'
                                                                          )
                                                                              .add(90, 'minutes')
                                                                              .format('HH:mm')
                                                                        : '__:__'}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <SelectTimeThree
                                                    value={formValue.time3}
                                                    onChange={value => {
                                                        onChange('time3', value);
                                                        field.onChange(value);
                                                    }}
                                                />
                                            )
                                        }
                                    />
                                </div>
                                <p className="text-red-500 mt-2 text-sm">{errorTime.time3}</p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending || disabled}>
                                {isPending ? 'Membuat...' : 'Buat Kelompok Belajar'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddNewStudyGroup;
