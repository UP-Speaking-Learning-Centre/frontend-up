import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetTeacherScheduleQuery } from '../../queries/use-get-teacher-schedule';
import { useScheduleOptions } from '../../hooks/use-map-teacher';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';
import { dayNames, days } from '@/constants/schedule';

export const SelectDayOne = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { teacherTeamMemberId } = useNewStudyGroupStore(s => s.formValue);
    const { days: availableDays } = useScheduleOptions(data || []);

    const renderOptions = () => {
        if (!teacherTeamMemberId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Guru terlebih dahulu
                </SelectItem>
            );
        }

        return availableDays
            .sort((a, b) => days.indexOf(a) - days.indexOf(b))
            .map(day => (
                <SelectItem key={day} value={day}>
                    {dayNames[days.indexOf(day)]}
                </SelectItem>
            ));
    };

    return (
        <div className="flex-1 w-full">
            <Label className="font-normal">Hari</Label>
            <Select onValueChange={value => onChange(value)} value={value}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Jadwal" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export const SelectTimeOne = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { getStartTimes } = useScheduleOptions(data || []);
    const { day1 } = useNewStudyGroupStore(s => s.formValue);

    const renderOptions = () => {
        if (!day1) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Hari 1 terlebih dahulu
                </SelectItem>
            );
        }

        return getStartTimes(true).map(startTime => (
            <SelectItem key={startTime} value={startTime}>
                {startTime}
            </SelectItem>
        ));
    };

    return (
        <div className="flex-1 w-full">
            <Label className="font-normal">Waktu</Label>
            <Select onValueChange={value => onChange(value)} value={value}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Jadwal" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};
