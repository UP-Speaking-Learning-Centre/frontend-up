import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFetchLevelsQuery from '@/features/select-program/queries/use-fetch-levels';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';

const SelectLevel = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { groupId } = useNewStudyGroupStore(s => s.formValue);
    const { data, isLoading } = useFetchLevelsQuery(true);

    const renderOptions = () => {
        if (!groupId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Grup terlebih dahulu
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

        return data?.map(level => (
            <SelectItem key={level.id} value={level.id.toString()}>
                {level.name}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Level*</Label>
            <Select onValueChange={value => onChange(value)} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Level" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectLevel;
