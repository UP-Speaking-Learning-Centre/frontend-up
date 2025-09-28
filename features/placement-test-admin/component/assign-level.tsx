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

const AssignLevel = () => {
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

    if (isLoadingLevel || isLoadingGrade || isLoading || isLoadingTeacher || isLoadingSchedule)
        return (
            <div>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton loading={true} className="h-10"></Skeleton>
            </div>
        );

    return (
        <div className="space-y-4">
            <div>
                <Label>Assigned Level</Label>
                <Select
                    value={assignedLevel}
                    onValueChange={assignedLevel => setState({ assignedLevel })}
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
            </div>
            <div>
                <Label>Assigned Grade</Label>
                <Select
                    value={assignedGrade}
                    onValueChange={assignedGrade => setState({ assignedGrade })}
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
            </div>
            <div>
                <Label>Assigned Location</Label>
                <Select
                    value={assignedLocation}
                    onValueChange={assignedLocation => setState({ assignedLocation })}
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
            </div>
            <div>
                <Label>Assigned Mentor</Label>
                <Select
                    value={assignedMentor}
                    onValueChange={assignedMentor => setState({ assignedMentor })}
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
            </div>
            <div>
                <Label>Assigned Study Group</Label>
                <Select
                    value={assignedSchedule}
                    onValueChange={assignedSchedule => setState({ assignedSchedule })}
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
