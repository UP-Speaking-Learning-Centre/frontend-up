'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FunnelStage, LeadStatus, Role } from '../types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNonUserFilterForm } from '../hooks/use-non-user-filter-form';
import { useNonUserFilterStore } from '../stores/filter-store';

interface NonUserFilterFormProps {
    menuType: 'marketing' | 'admin';
}

export const NonUserFilterForm = ({ menuType }: NonUserFilterFormProps) => {
    const {
        form,
        onSubmit,
        handleReset,
        isCalendarOpen,
        setIsCalendarOpen,
        isPicRoleDropdownOpen,
        setIsPicRoleDropdownOpen,
        isPicStaffDropdownOpen,
        setIsPicStaffDropdownOpen,
        adminRoles,
        marketingRoles,
        picStaffOptions,
    } = useNonUserFilterForm(menuType);

    const renderPicTriggerContent = (fieldValues: string[], defaultLabel: string) => {
        if (!fieldValues || fieldValues.length === 0) {
            return <span className="text-muted-foreground">{defaultLabel}</span>;
        }

        if (fieldValues.length <= 2) {
            return (
                <div className="flex flex-wrap gap-1">
                    {fieldValues.map(val => (
                        <Badge variant="secondary" key={val} className="mr-1 py-0 px-2 font-normal">
                            {val}
                        </Badge>
                    ))}
                </div>
            );
        }

        return (
            <div className="flex flex-wrap gap-1 items-center">
                <Badge variant="secondary" className="mr-1 py-0 px-2 font-normal">
                    {fieldValues[0]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                    +{fieldValues.length - 1} lainnya
                </span>
            </div>
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Student</FormLabel>
                            <FormControl>
                                <Input placeholder="Cari Nama" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="funnelStage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Funnel Stage</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Funnel Stage" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(FunnelStage).map(stage => (
                                        <SelectItem key={stage} value={stage}>
                                            {stage}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="leadStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lead Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Lead Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(LeadStatus).map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="picRole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PIC Role</FormLabel>
                            {menuType === 'marketing' ? (
                                <Button
                                    variant="outline"
                                    className="w-full justify-between font-normal text-left disabled:opacity-50"
                                    disabled
                                    type="button"
                                >
                                    {Role.StaffMarketing}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            ) : (
                                <Popover
                                    open={isPicRoleDropdownOpen}
                                    onOpenChange={setIsPicRoleDropdownOpen}
                                    modal={true}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    'w-full justify-between font-normal text-left h-auto min-h-10',
                                                    !(field.value as string[])?.length &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {renderPicTriggerContent(
                                                    (field.value as string[]) || [],
                                                    'Pilih PIC Role'
                                                )}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[368px] p-0" align="start">
                                        <div className="p-2 space-y-1">
                                            {adminRoles.map(role => {
                                                const isSelected =
                                                    (field.value as string[] | undefined)?.includes(
                                                        role
                                                    ) || false;
                                                return (
                                                    <div
                                                        key={role}
                                                        className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
                                                        onClick={() => {
                                                            const current =
                                                                (field.value as string[]) || [];
                                                            const updated = current.includes(role)
                                                                ? current.filter(r => r !== role)
                                                                : [...current, role];
                                                            field.onChange(updated);
                                                        }}
                                                    >
                                                        <Checkbox checked={isSelected} tabIndex={-1} />
                                                        <label className="text-sm font-medium leading-none cursor-pointer">
                                                            {role}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="picStaff"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PIC Staff</FormLabel>
                            <Popover
                                open={isPicStaffDropdownOpen}
                                onOpenChange={setIsPicStaffDropdownOpen}
                                modal={true}
                            >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-full justify-between font-normal text-left h-auto min-h-10',
                                                !(field.value as string[])?.length &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {renderPicTriggerContent(
                                                (field.value as string[]) || [],
                                                'Pilih PIC Staff'
                                            )}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[368px] p-0" align="start">
                                    <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                                        {picStaffOptions.map(staff => {
                                            const isSelected =
                                                (field.value as string[] | undefined)?.includes(
                                                    staff
                                                ) || false;
                                            return (
                                                <div
                                                    key={staff}
                                                    className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
                                                    onClick={() => {
                                                        const current =
                                                            (field.value as string[]) || [];
                                                        const updated = current.includes(staff)
                                                            ? current.filter(s => s !== staff)
                                                            : [...current, staff];
                                                        field.onChange(updated);
                                                    }}
                                                >
                                                    <Checkbox checked={isSelected} tabIndex={-1} />
                                                    <label className="text-sm font-medium leading-none cursor-pointer">
                                                        {staff}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastFollowUp"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Last Follow Up</FormLabel>
                            <Popover
                                open={isCalendarOpen}
                                onOpenChange={setIsCalendarOpen}
                                modal={true}
                            >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                !field.value?.from && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                    <>
                                                        {format(field.value.from, 'LLL dd, y')} -{' '}
                                                        {format(field.value.to, 'LLL dd, y')}
                                                    </>
                                                ) : (
                                                    format(field.value.from, 'LLL dd, y')
                                                )
                                            ) : (
                                                <span>Pilih Range Tanggal</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={(field.value as any) || undefined}
                                        onSelect={field.onChange}
                                        numberOfMonths={2}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <div className="flex gap-2 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button type="submit" className="w-full">
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
};
