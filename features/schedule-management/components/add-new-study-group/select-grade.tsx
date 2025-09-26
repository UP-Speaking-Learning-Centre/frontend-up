import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectGrade = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
    return (
        <div>
            <Label>Grade*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Grade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="grade1">Grade 1</SelectItem>
                    <SelectItem value="grade2">Grade 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectGrade;
