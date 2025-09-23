import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectLevel = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
    console.log('asasdasdasd');
    return (
        <div>
            <Label>Level*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="group1">Grup 1</SelectItem>
                    <SelectItem value="group2">Grup 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectLevel;
