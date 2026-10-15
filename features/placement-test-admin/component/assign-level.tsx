import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import useGetStudyGroup from '@/features/admin/queries/useGetStudyGroup';
import { FormStatusManagement } from '@/types/placement-test-admin';
import { FC, useEffect, useMemo } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form';
import useGetGrade from '../queries/use-get-grade';
import useGetLevel from '../queries/use-get-level';
import useGetLocation from '../queries/use-get-location';
import useGetTeacher from '../queries/use-get-teacher';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import useGetProfileById from '@/features/home/queries/useGetProfileById';

interface Props {
    errors: FieldErrors<FormStatusManagement>;
    register: UseFormRegister<FormStatusManagement>;
    setValue: UseFormSetValue<FormStatusManagement>;
    reset: UseFormReset<FormStatusManagement>;
}
const AssignLevel: FC<Props> = ({ errors, setValue, reset }) => {
    const {
        isGraded,
        assignedLevel,
        assignedMentor,
        assignedSchedule,
        noteForStudent,
        assignedLocation,
        assignedGrade,
        test,
        student,
        setState,
    } = useDisplayedPlacementTestStore();

    const { data, isLoading } = useGetLocation();
    const { data: dataStudent, isLoading: isLoadingStudent } = useGetProfileById(student?.id || 0);
    const { data: dataSchedule, isLoading: isLoadingSchedule } = useGetStudyGroup(
        Number(assignedLocation)
    );
    const { data: dataTeacher, isLoading: isLoadingTeacher } = useGetTeacher();
    const { data: dataLevel, isLoading: isLoadingLevel } = useGetLevel();
    const { data: dataGrade, isLoading: isLoadingGrade } = useGetGrade();

    useEffect(() => {
        if (!isLoadingStudent && dataStudent) {
            const { gradeId, levelId, primaryStudyGroupId, notes } = dataStudent;
            setState({
                assignedGrade: gradeId?.toString(),
                assignedLevel: levelId?.toString(),
                assignedSchedule: primaryStudyGroupId?.toString(),
                noteForStudent: notes || '',
            });
        }
    }, [dataStudent, isLoadingStudent]);

    const selectedGrade = useMemo(() => {
        return dataGrade?.find(grade => grade.id === +assignedGrade);
    }, [dataGrade, assignedGrade]);
    const filteredSchedule = useMemo(() => {
        return dataSchedule?.filter(
            (sch: any) =>
                sch.teacherTeamMemberId?.toString() === assignedMentor &&
                sch.packageId === test?.packageId
        );
    }, [dataSchedule, assignedMentor, test]);
    const filteredDataTeacher = dataTeacher?.filter(
        teach =>
            teach.schedules.some(sch => !sch.isFull) &&
            selectedGrade?.taughtBy.some(alias => alias.name === teach.alias)
    );

    useEffect(() => {
        setState({
            assignedLevel: '',
            assignedGrade: '',
            assignedSchedule: '',
            noteForStudent: '',
            assignedLocation: '',
            assignedMentor: '',
        });
        reset();
    }, []);

    return (
        <div className="space-y-4">
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoadingLevel}>
                    <Label>Assigned Level</Label>
                </Skeleton>
                <Skeleton loading={isLoadingLevel} className="h-10">
                    {isGraded ? (
                        <p className="font-semibold text-gray-900">{dataStudent?.level}</p>
                    ) : (
                        <Select
                            value={assignedLevel}
                            onValueChange={assignedLevel => {
                                setState({ assignedLevel });
                                setValue('level', assignedLevel);
                            }}
                            disabled={!dataLevel?.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataLevel?.map(level => (
                                    <SelectItem value={level.id.toString()} key={level.id}>
                                        {level.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </Skeleton>

                {errors.level && (
                    <p className="text-red-500 text-sm mt-1">{errors.level.message?.toString()}</p>
                )}
            </div>
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoadingGrade}>
                    <Label>Assigned Grade</Label>
                </Skeleton>
                <Skeleton loading={isLoadingGrade} className="h-10">
                    {isGraded ? (
                        <p className="font-semibold text-gray-900">{dataStudent?.gradeLabel}</p>
                    ) : (
                        <Select
                            value={assignedGrade}
                            onValueChange={assignedGrade => {
                                setState({ assignedGrade });
                                setValue('grade', assignedGrade);
                            }}
                            disabled={!dataGrade?.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataGrade?.map(grade => (
                                    <SelectItem value={grade.id.toString()} key={grade.id}>
                                        {grade.gradeNumber}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </Skeleton>
                {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade.message?.toString()}</p>
                )}
            </div>
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoading}>
                    <Label>Assigned Location</Label>
                </Skeleton>
                <Skeleton loading={isLoading} className="h-10">
                    {isGraded ? (
                        <p className="font-semibold text-gray-900">
                            {dataStudent?.schedules[0]?.location}
                        </p>
                    ) : (
                        <Select
                            value={assignedLocation}
                            onValueChange={assignedLocation => {
                                setState({ assignedLocation });
                                setValue('location', assignedLocation);
                            }}
                            disabled={!data?.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                {data?.map(loc => (
                                    <SelectItem
                                        value={loc.locationId.toString()}
                                        key={loc.locationId}
                                    >
                                        {loc.locationName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </Skeleton>
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message?.toString()}
                    </p>
                )}
            </div>
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoadingTeacher}>
                    <Label>Assigned Mentor</Label>
                </Skeleton>
                <Skeleton loading={isLoadingTeacher} className="h-10">
                    {assignedLocation && !filteredDataTeacher?.length ? (
                        <p className="text-sm text-primary font-bold mt-2">
                            Belum ada guru yang tersedia di lokasi tersebut
                        </p>
                    ) : isGraded ? (
                        <p className="font-semibold text-gray-900">
                            {dataStudent?.schedules[0]?.teacherMemberName}
                        </p>
                    ) : (
                        <Select
                            value={assignedMentor}
                            onValueChange={assignedMentor => {
                                setState({ assignedMentor });
                                setValue('mentor', assignedMentor);
                            }}
                            disabled={!dataTeacher?.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Mentor" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredDataTeacher?.map(teach => (
                                    <SelectItem
                                        value={teach.memberId.toString()}
                                        key={teach.memberId}
                                    >
                                        {teach.memberName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </Skeleton>
                {errors.mentor && (
                    <p className="text-red-500 text-sm mt-1">{errors.mentor.message?.toString()}</p>
                )}
            </div>
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoadingSchedule}>
                    <Label>Assigned Study Group</Label>
                </Skeleton>
                <Skeleton loading={isLoadingSchedule} className="h-10">
                    {assignedMentor && !filteredSchedule?.length ? (
                        <p className="text-sm text-primary font-bold mt-2">
                            Belum ada kelompok belajar yang sesuai
                        </p>
                    ) : isGraded ? (
                        <p className="font-semibold text-gray-900">
                            {dataStudent?.schedules[0]?.studyGroupName}
                        </p>
                    ) : (
                        <Select
                            value={assignedSchedule}
                            onValueChange={assignedSchedule => {
                                setState({ assignedSchedule });
                                setValue('studyGroup', assignedSchedule);
                            }}
                            disabled={!dataSchedule?.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Study Group" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredSchedule?.map((sch: any) => (
                                    <SelectItem
                                        value={sch.studyGroupId.toString()}
                                        key={sch.studyGroupId}
                                    >
                                        {sch.studyGroupName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </Skeleton>
                {errors.studyGroup && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.studyGroup.message?.toString()}
                    </p>
                )}
            </div>
            <div>
                <Label>Notes for student</Label>
                {!isGraded ? (
                    <Textarea
                        value={noteForStudent}
                        onChange={e => setState({ noteForStudent: e.target.value })}
                        placeholder="e.g., Sangat baik"
                    />
                ) : (
                    <p className="font-semibold text-gray-900">{noteForStudent}</p>
                )}
            </div>
        </div>
    );
};

export default AssignLevel;
