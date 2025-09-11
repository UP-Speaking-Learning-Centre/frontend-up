import React from 'react';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { Book, BookOpen, Calendar, Package, User } from 'lucide-react';
import { renderDayToIndonesian } from '@/lib/moment';
import moment from 'moment';

const SummaryItem = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    return (
        <div className="mx-auto space-y-6 mt-6">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-5 rounded-lg border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
                    <div className="bg-[#DCFCE7] size-10 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-[#16A34A] size-6" />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm">Program yang dipilih</p>
                        <p className="font-semibold text-[#111827] text-lg">
                            {formValue.programName} ({formValue.groupName})
                        </p>
                    </div>
                </div>
                <div className="col-span-4 rounded-lg border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
                    <div className="bg-[#F3E8FF] size-10 rounded-lg flex items-center justify-center">
                        <Calendar className="text-[#9333EA] size-6" />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm">Level dan Grade</p>
                        <p className="font-semibold text-[#111827] text-lg">
                            {formValue.levelName} ({formValue.gradeName})
                        </p>
                    </div>
                </div>
                <div className="col-span-3 rounded-lg border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
                    <div className="bg-[#EFF6FF] size-10 rounded-lg flex items-center justify-center">
                        <Package className="text-[#2563EB] size-6" />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm">Paket</p>
                        <p className="font-semibold text-[#111827] text-lg">
                            {formValue.packageName}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-8/12 rounded-lg border-2 bg-white border-[#E2E8F0] flex flex-col items-center mx-auto">
                <div className="px-6 py-4 border-b w-full border-[#E2E8F0] flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-[#CE6439] size-6" />
                        <p className="font-semibold text-[#111827] text-lg">Jadwal Kelas</p>
                    </div>
                    <div className="text-[#4B5563] text-lg">
                        Cabang:{' '}
                        <span className="font-semibold text-[#111827]">
                            {formValue.locationName}
                        </span>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-6 w-full">
                    <div className="col-span-1">
                        <p className="font-semibold text-[#111827]">Jadwal Pertama</p>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-4">
                            <Calendar className="text-[#CE6439] size-4" />
                            <p className="text-sm">Hari</p>
                            <p className="grow text-right font-semibold">
                                {renderDayToIndonesian(
                                    formValue.schedule.firstSession.dayOfWeek as string
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                            <Calendar className="text-[#CE6439] size-4" />
                            <p className="text-sm">Jam</p>
                            <p className="grow text-right font-semibold">
                                {moment(
                                    formValue.schedule.firstSession.startTime,
                                    'HH:mm:ss'
                                ).format('HH:mm')}{' '}
                                -{' '}
                                {moment(formValue.schedule.firstSession.endTime, 'HH:mm:ss').format(
                                    'HH:mm'
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                            <User className="text-[#CE6439] size-4" />
                            <p className="text-sm">Mentor</p>
                            <p className="grow text-right font-semibold">
                                {formValue.schedule.firstSession.teacherMemberName}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <p className="font-semibold text-[#111827]">Jadwal Kedua</p>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-4">
                            <Calendar className="text-[#CE6439] size-4" />
                            <p className="text-sm">Hari</p>
                            <p className="grow text-right font-semibold">
                                {renderDayToIndonesian(
                                    formValue.schedule.secondSession.dayOfWeek as string
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                            <Calendar className="text-[#CE6439] size-4" />
                            <p className="text-sm">Jam</p>
                            <p className="grow text-right font-semibold">
                                {moment(
                                    formValue.schedule.secondSession.startTime,
                                    'HH:mm:ss'
                                ).format('HH:mm')}{' '}
                                -{' '}
                                {moment(
                                    formValue.schedule.secondSession.endTime,
                                    'HH:mm:ss'
                                ).format('HH:mm')}
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                            <User className="text-[#CE6439] size-4" />
                            <p className="text-sm">Mentor</p>
                            <p className="grow text-right font-semibold">
                                {formValue.schedule.secondSession.teacherMemberName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryItem;
