import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';
import useFetchPackagesQuery from '@/features/select-program/queries/use-fetch-packages';

const SelectPackage = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { gradeId } = useNewStudyGroupStore(s => s.formValue);
    const { data, isLoading } = useFetchPackagesQuery();

    const renderOptions = () => {
        if (!gradeId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Grade terlebih dahulu
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

        return data?.map(pckg => (
            <SelectItem key={pckg.id} value={pckg.id.toString()}>
                {pckg.name}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Package*</Label>
            <Select onValueChange={value => onChange(Number(value))} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Paket" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectPackage;
