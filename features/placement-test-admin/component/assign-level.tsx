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
import useGetAvailableSchedule from '../queries/use-get-available-schedule';
import useGetGrade from '../queries/use-get-grade';
import useGetLevel from '../queries/use-get-level';
import useGetLocation from '../queries/use-get-location';
import useGetTeacher from '../queries/use-get-teacher';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import useGetStudyGroup from '@/features/admin/queries/useGetStudyGroup';
import { FC } from 'react';
import { FormStatusManagement } from '@/types/placement-test-admin';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface Props {
    errors: FieldErrors<FormStatusManagement>;
    register: UseFormRegister<FormStatusManagement>;
    setValue: UseFormSetValue<FormStatusManagement>;
}
const AssignLevel: FC<Props> = ({ errors, register, setValue }) => {
    const {
        assignedLevel,
        assignedMentor,
        assignedSchedule,
        noteForStudent,
        assignedLocation,
        assignedGrade,
        setState,
    } = useDisplayedPlacementTestStore();
    const { data, isLoading } = useGetLocation();
    const { data: dataSchedule, isLoading: isLoadingSchedule } = useGetStudyGroup(
        Number(assignedLocation)
    );
    const { data: dataTeacher, isLoading: isLoadingTeacher } = useGetTeacher();
    const { data: dataLevel, isLoading: isLoadingLevel } = useGetLevel();
    const { data: dataGrade, isLoading: isLoadingGrade } = useGetGrade();

    return (
        <div className="space-y-4">
            <div>
                <Skeleton className="h-4 w-16 mb-1" loading={isLoadingLevel}>
                    <Label>Assigned Level</Label>
                </Skeleton>
                <Skeleton loading={isLoadingLevel} className="h-10">
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
                                <SelectItem value={level.id.toString()}>{level.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                                <SelectItem value={grade.id.toString()}>{grade.gradeNumber}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                    <Select
                        value={assignedLocation}
                        onValueChange={assignedLocation => {
                            setState({ assignedLocation });
                            setValue('location', assignedLocation);
                        }}
                        disabled={!data?.length}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select mentor" />
                        </SelectTrigger>
                        <SelectContent>
                            {data?.map(loc => (
                                <SelectItem value={loc.locationId.toString()}>
                                    {loc.locationName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                    <Select
                        value={assignedMentor}
                        onValueChange={assignedMentor => {
                            setState({ assignedMentor });
                            setValue('mentor', assignedMentor);
                        }}
                        disabled={!dataTeacher?.length}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select mentor" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataTeacher
                                ?.filter(teach => teach.schedules.some(sch => !sch.isFull))
                                ?.map(teach => (
                                    <SelectItem value={teach.memberId.toString()}>
                                        {teach.memberName}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
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
                            {dataSchedule
                                ?.filter(sch => sch.teacherTeamMemberId.toString() === assignedMentor)
                                ?.map(sch => (
                                    <SelectItem value={sch.studyGroupId.toString()}>
                                        {sch.studyGroupName}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </Skeleton>
                {errors.studyGroup && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.studyGroup.message?.toString()}
                    </p>
                )}
            </div>
            <div>
                <Label>Notes for student</Label>
                <Textarea
                    value={noteForStudent}
                    onChange={e => setState({ noteForStudent: e.target.value })}
                    placeholder="e.g., Sangat baik"
                />
            </div>
        </div>
    );
};

export default AssignLevel;
