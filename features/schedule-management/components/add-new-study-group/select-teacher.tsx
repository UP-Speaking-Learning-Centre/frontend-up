import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectTeacher = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    return (
        <div>
            <Label>Teacher*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Program" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="program1">Program 1</SelectItem>
                    <SelectItem value="program2">Program 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectTeacher;
