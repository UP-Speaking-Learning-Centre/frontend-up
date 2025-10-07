import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useProgramSelectionStore from '@/features/select-program/stores/program-selection-store';
import useFetchGradesQuery from '@/features/select-program/queries/use-fetch-grades';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';

const SelectGrade = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { groupId } = useNewStudyGroupStore(s => s.formValue);
    const { data, isLoading } = useFetchGradesQuery(true);

    const renderOptions = () => {
        if (!groupId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Level terlebih dahulu
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

        return data?.map(grade => (
            <SelectItem key={grade.id} value={grade.id.toString()}>
                {grade.gradeNumber}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Grade*</Label>
            <Select onValueChange={value => onChange(Number(value))} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Grade" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectGrade;
