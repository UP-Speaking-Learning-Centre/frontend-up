import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFetchProgramsQuery from '@/features/select-program/queries/use-fetch-programs';

const SelectProgram = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    const { data, isLoading } = useFetchProgramsQuery();
    return (
        <div>
            <Label>Program*</Label>
            <Select>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Program" />
                </SelectTrigger>
                <SelectContent>
                    {isLoading ? (
                        <SelectItem value="loading" disabled>
                            Loading...
                        </SelectItem>
                    ) : (
                        data?.map(program => (
                            <SelectItem key={program.id} value={program.id.toString()}>
                                {program.name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectProgram;
