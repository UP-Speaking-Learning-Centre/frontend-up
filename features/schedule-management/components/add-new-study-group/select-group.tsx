import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFetchGroupsQuery from '@/features/select-program/queries/use-fetch-groups';
import { useNewStudyGroupStore } from '@/features/schedule-management/stores/new-study-group-store';

const SelectGroup = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { data, isLoading } = useFetchGroupsQuery();
    const formValue = useNewStudyGroupStore(s => s.formValue);

    const renderOptions = () => {
        if (!formValue.programId) {
            return (
                <SelectItem disabled value="empty">
                    Pilih Program Terlebih Dahulu
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

        return data?.map(group => (
            <SelectItem key={group.id} value={group.id.toString()}>
                {group.name}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Grup*</Label>
            <Select onValueChange={value => onChange(value)} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Grup" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectGroup;
