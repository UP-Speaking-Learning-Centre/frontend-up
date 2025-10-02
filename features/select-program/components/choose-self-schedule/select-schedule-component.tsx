'use client';

import * as React from 'react';
import { TimerIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dayNames } from '@/constants/schedule';
import moment from 'moment';

const SelectScheduleComponent = ({
    index,
    setDay,
    time,
    setTime,
}: {
    day: string | undefined;
    index: number;
    setDay: (day: string | undefined) => void;
    time: string | undefined;
    setTime: (time: string | undefined) => void;
}) => {
    return (
        <div className="flex flex-col gap-4 basis-2/5 p-4 w-full rounded-lg border-2 border-[#E2E8F0] bg-secondary">
            <h4 className="text-lg font-semibold text-white">
                Jadwal {index === 0 ? 'Pertama' : 'Kedua'}
            </h4>
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1 text-white">
                    Pilih Hari
                </Label>
                <Select onValueChange={setDay}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Pilih Hari" />
                    </SelectTrigger>
                    <SelectContent className="w-fit">
                        {dayNames?.map(day => (
                            <SelectItem key={String(day)} value={String(day)}>
                                {day}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
                <Label
                    htmlFor="time-picker"
                    className="px-1 text-base border-b-2 border-secondary pb-1 text-center"
                >
                    Pilih Waktu
                </Label>
                <div className="flex flex-1 items-center w-full gap-4">
                    <div className="relative flex-1">
                        <TimerIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500" />
                        <Input
                            onChange={e => setTime(e.target.value)}
                            type="time"
                            id="time-picker"
                            step="60"
                            className="bg-background ps-8 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>

                    <p className="text-sm text-neutral-500">s/d</p>
                    <p className="w-fit font-medium text-lg pr-6">
                        {time
                            ? moment(time, 'HH:mm:ss').add(90, 'minutes').format('HH:mm')
                            : '__:__'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SelectScheduleComponent;
