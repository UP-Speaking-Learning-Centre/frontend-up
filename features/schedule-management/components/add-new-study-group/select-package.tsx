import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectPackage = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    return (
        <div>
            <Label>Package*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Paket" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="package1">Paket 1</SelectItem>
                    <SelectItem value="package2">Paket 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectPackage;
