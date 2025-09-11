import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useGetAvailableSchedule from '../queries/use-get-available-schedule';
import useGetLevel from '../queries/use-get-level';
import useGetLocation from '../queries/use-get-location';
import useGetTeacher from '../queries/use-get-teacher';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import useGetGrade from '../queries/use-get-grade';

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
    const { data: dataSchedule, isLoading: isLoadingSchedule } = useGetAvailableSchedule();
    const { data: dataTeacher, isLoading: isLoadingTeacher } = useGetTeacher();
    const { data: dataLevel } = useGetLevel();
    const { data: dataGrade } = useGetGrade();

    return (
        <div className="space-y-4">
            <div>
                <Label>Assigned Level</Label>
                <Select
                    value={assignedLevel}
                    onValueChange={assignedLevel => setState({ assignedLevel })}
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
                <Label>Assigned Schedule</Label>
                <Select
                    value={assignedSchedule}
                    onValueChange={assignedSchedule => setState({ assignedSchedule })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                        {dataSchedule
                            ?.filter(sch => sch.teacherMemberId.toString() === assignedMentor)
                            ?.map(sch => (
                                <SelectItem value={sch.scheduleId.toString()}>
                                    {sch.dayOfWeek} {sch.startTime} - {sch.endTime} (
                                    {sch.durationMinutes} Minutes)
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
