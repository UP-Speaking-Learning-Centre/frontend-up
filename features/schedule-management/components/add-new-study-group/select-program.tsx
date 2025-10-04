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
    value: number | string;
    onChange: (value: number | string) => void;
}) => {
    const { data, isLoading } = useFetchProgramsQuery();

    const renderOptions = () => {
        if (isLoading) {
            return (
                <SelectItem disabled value="loading">
                    Loading...
                </SelectItem>
            );
        }

        return data?.map(program => (
            <SelectItem key={program.id} value={program.id.toString()}>
                {program.name}
            </SelectItem>
        ));
    };

    return (
        <div>
            <Label>Program*</Label>
            <Select onValueChange={value => onChange(value)} value={value.toString()}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih Program" />
                </SelectTrigger>
                <SelectContent>{renderOptions()}</SelectContent>
            </Select>
        </div>
    );
};

export default SelectProgram;
