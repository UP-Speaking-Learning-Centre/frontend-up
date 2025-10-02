import React, { FC } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';

interface IAdminSelect {
    label: string;
    options: { id: number | string; name: string }[];
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    loading?: boolean;
}

const AdminSelect: FC<IAdminSelect & SelectProps> = ({
    label,
    options,
    defaultValue,
    placeholder,
    loading,
    ...props
}) => {
    return (
        <div className="col-span-1 flex flex-col items-start gap-2">
            <Label>{label}</Label>
            <Select {...props} disabled={loading}>
                <SelectTrigger >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
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

export default AdminSelect;
