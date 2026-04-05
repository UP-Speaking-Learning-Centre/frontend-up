import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FieldDisplay } from './field-display';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock } from 'lucide-react';
import moment from 'moment';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export const FormFieldDisplay = <T extends FieldValues>({
    form,
    name,
    label,
    isEditing,
    suffix = '',
    highlight = false,
    type = 'text',
    options = [],
}: {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    isEditing: boolean;
    suffix?: string;
    highlight?: boolean;
    type?: 'text' | 'select' | 'datetime-local' | 'number' | 'datetime-picker';
    options?: { label: string; value: string }[];
}) => {
    if (!isEditing) {
        const value = form.getValues(name);
        let displayValue = value ? `${value}${suffix}` : undefined;
        if (value && type === 'datetime-picker') {
            displayValue = moment(value).format('DD MMM YYYY, HH:mm');
        }
        return <FieldDisplay label={label} value={displayValue} highlight={highlight} />;
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm text-gray-600 mb-1">{label}</FormLabel>
                    <FormControl>
                        {type === 'select' ? (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Pilih ${label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : type === 'datetime-picker' ? (
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full justify-start text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    moment(field.value).format('DD MMM YYYY')
                                                ) : (
                                                    <span>Pilih Tanggal</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value
                                                        ? moment(field.value).toDate()
                                                        : undefined
                                                }
                                                onSelect={date => {
                                                    if (!date) return;
                                                    const existingTime =
                                                        field.value && moment(field.value).isValid()
                                                            ? moment(field.value).format('HH:mm')
                                                            : '00:00';
                                                    field.onChange(
                                                        `${moment(date).format(
                                                            'YYYY-MM-DD'
                                                        )}T${existingTime}`
                                                    );
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <div className="relative">
                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="time"
                                            className="w-[120px] pl-8"
                                            value={
                                                field.value && moment(field.value).isValid()
                                                    ? moment(field.value).format('HH:mm')
                                                    : ''
                                            }
                                            onChange={e => {
                                                const time = e.target.value;
                                                const datePart =
                                                    field.value && moment(field.value).isValid()
                                                        ? moment(field.value).format('YYYY-MM-DD')
                                                        : '';
                                                if (datePart) {
                                                    field.onChange(`${datePart}T${time}`);
                                                } else {
                                                    field.onChange(`T${time}`);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {(!field.value ||
                                    field.value.startsWith('T') ||
                                    field.value.endsWith('T') ||
                                    !field.value.includes('T')) && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        Tanggal dan waktu harus diisi
                                    </p>
                                )}
                            </div>
                        ) : (
                            <Input
                                {...field}
                                type={type}
                                value={field.value || ''}
                                className={type === 'datetime-local' ? 'block' : ''}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
