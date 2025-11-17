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
import { dayNames, days } from '@/constants/schedule';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';
import moment from 'moment';

export const SelectDayTwo = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { day1, time1 } = useNewStudyGroupStore(s => s.formValue);
    const { days: availableDays } = useScheduleOptions(data || []);

    const renderOptions = () => {
        if (!day1 || !time1) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Jadwal 1 terlebih dahulu
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

export const SelectTimeTwo = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const { data } = useGetTeacherScheduleQuery(true);
    const { day2 } = useNewStudyGroupStore(s => s.formValue);
    const { getStartTimes } = useScheduleOptions(data || []);

    const renderOptions = () => {
        if (!day2) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Hari 2 terlebih dahulu
                </SelectItem>
            );
        }

        return getStartTimes(false).map(startTime => (
            <SelectItem key={startTime} value={startTime}>
                {startTime}
            </SelectItem>
        ));
    };
    return (
        <div className="flex-1 w-full">
            <Label className="font-normal">Waktu</Label>
            <div className="flex gap-2 items-center">
                <div className="flex-1">
                    <Select onValueChange={value => onChange(value)} value={value}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Pilih Jadwal" />
                        </SelectTrigger>
                        <SelectContent>{renderOptions()}</SelectContent>
                    </Select>
                </div>
                <p className="text-sm text-neutral-500">s/d</p>
                <p className="w-fit font-medium text-base pr-2">
                    {value ? moment(value, 'HH:mm:ss').add(90, 'minutes').format('HH:mm') : '__:__'}
                </p>
            </div>
        </div>
    );
};
