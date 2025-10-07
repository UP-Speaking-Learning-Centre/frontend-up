import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetTeacherScheduleQuery } from '../../queries/use-get-teacher-schedule';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';
import { useScheduleOptions } from '../../hooks/use-map-teacher';

const SelectTeacher = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { data, isLoading } = useGetTeacherScheduleQuery(true);
    const { locationId } = useNewStudyGroupStore(s => s.formValue);

    const { teachers } = useScheduleOptions(data || []);

    const renderOptions = () => {
        if (!locationId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Cabang terlebih dahulu
                </SelectItem>
            );
        }

        if (isLoading) {
            return (
                <SelectItem disabled value="loading">
                    Loading...
                </SelectItem>
            );
        }

        if (!teachers.length) {
            return (
                <SelectItem disabled value="loading">
                    Tidak ada data
                </SelectItem>
            );
        }

        return teachers?.map(teacher => (
            <SelectItem key={teacher.teacherMemberName} value={teacher.teacherMemberName}>
                {teacher.teacherMemberName}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Teacher*</Label>
            <Select onValueChange={value => onChange(value)} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Teacher" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectTeacher;
