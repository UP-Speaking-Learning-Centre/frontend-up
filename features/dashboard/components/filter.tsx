import React, { FC } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface IFilter {
    label: string;
    options: { id: number | string; name: string }[];
    onSelect: (value: string) => void;
    defaultValue: string;
    value?: string;
}

const Filter: FC<IFilter> = ({ label, options, onSelect, defaultValue, value }) => {
    return (
        <div className="col-span-1 flex flex-col items-start gap-2">
            <Label>{label}</Label>
            <Select value={value ?? defaultValue} onValueChange={onSelect}>
                <SelectTrigger>
                    <SelectValue placeholder={defaultValue} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={defaultValue}>{defaultValue}</SelectItem>
                    {options.map(option => (
                        <SelectItem key={option.id} value={option.id.toString()}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Filter;
