import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFetchLocationsQuery from '@/features/select-program/queries/use-fetch-locations';
import { useNewStudyGroupStore } from '../../stores/new-study-group-store';

const SelectLocation = ({
    value,
    onChange,
}: {
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { data, isLoading } = useFetchLocationsQuery();
    const { packageId } = useNewStudyGroupStore(s => s.formValue);

    const renderOptions = () => {
        if (!packageId) {
            return (
                <SelectItem disabled value="loading">
                    Pilih Paket terlebih dahulu
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

        return data?.map(location => (
            <SelectItem key={location.locationId} value={location.locationId.toString()}>
                {location.locationName}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Cabang*</Label>
            <Select onValueChange={value => onChange(value)} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Cabang" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectLocation;
