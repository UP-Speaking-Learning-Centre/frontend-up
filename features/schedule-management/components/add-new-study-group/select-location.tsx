import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectLocation = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    return (
        <div>
            <Label>Cabang*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Cabang" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="branch1">Cabang 1</SelectItem>
                    <SelectItem value="branch2">Cabang 2</SelectItem>
                    <SelectItem value="branch3">Cabang 3</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectLocation;
