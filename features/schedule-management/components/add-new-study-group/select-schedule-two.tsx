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

export const SelectDayTwo = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { days } = useScheduleOptions(data || []);

    console.log(days);

    return (
        <div className="grow shrink-0">
            <Label className="font-normal">Hari</Label>
            <Select onValueChange={value => onChange(value)} value={value}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Jadwal" />
                </SelectTrigger>
                <SelectContent>
                    {days.map(day => (
                        <SelectItem key={day} value={day}>
                            {day}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export const SelectTimeTwo = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { getStartTimes } = useScheduleOptions(data || []);

    console.log(getStartTimes(true));

    return (
        <div className="grow shrink-0">
            <Label className="font-normal">Waktu</Label>
            <Select onValueChange={value => onChange(value)} value={value}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Jadwal" />
                </SelectTrigger>
                <SelectContent>
                    {getStartTimes(false).map(startTime => (
                        <SelectItem key={startTime} value={startTime}>
                            {startTime}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
