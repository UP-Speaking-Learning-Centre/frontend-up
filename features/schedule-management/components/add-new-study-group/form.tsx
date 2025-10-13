import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
import { useEffect } from 'react';
import { SelectDayTwo, SelectTimeTwo } from './select-schedule-two';
import { useCreateNewStudyGroupMutation } from '../../queries/use-create-new-study-group';

const AddNewStudyGroup = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) => {
    const formValue = useNewStudyGroupStore(s => s.formValue);
    const setValue = useNewStudyGroupStore(s => s.setValue);
    const resetFormValue = useNewStudyGroupStore(s => s.resetFormValue);
    const resetAll = useNewStudyGroupStore(s => s.resetAll);
    const { mutate, isPending } = useCreateNewStudyGroupMutation();

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
    const { data: scheduleData } = useGetTeacherScheduleQuery(true);

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
        !formValue.scheduleId1 ||
        !formValue.scheduleId2;

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={() => {
                    setOpen(false);
                    resetAll();
                }}
            >
                <DialogContent className="h-[calc(100vh-10rem)] overflow-y-auto">
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
                                    <Label>Deskripsi</Label>
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
                            <Label>Jadwal 1*</Label>
                            <div className="flex gap-4 w-full">
                                <Controller
                                    control={control}
                                    name="day1"
                                    render={({ field }) => (
                                        <SelectDayOne
                                            value={formValue.day1}
                                            onChange={value => {
                                                onChange('day1', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time1"
                                    render={({ field }) => (
                                        <SelectTimeOne
                                            value={formValue.time1}
                                            onChange={value => {
                                                onChange('time1', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Jadwal 2*</Label>
                            <div className="flex gap-4 w-full">
                                <Controller
                                    control={control}
                                    name="day2"
                                    render={({ field }) => (
                                        <SelectDayTwo
                                            value={formValue.day2}
                                            onChange={value => {
                                                onChange('day2', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time2"
                                    render={({ field }) => (
                                        <SelectTimeTwo
                                            value={formValue.time2}
                                            onChange={value => {
                                                onChange('time2', value);
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

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
