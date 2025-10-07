import React from 'react';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { Book, BookOpen, Calendar, Package, User } from 'lucide-react';
import { renderDayToIndonesian } from '@/lib/moment';
import moment from 'moment';

const SummaryItem = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);

    return (
        <div className="mx-auto max-w-5xl mt-6">
            <div className="grid grid-cols-12  gap-6 w-full">
                <div className="col-span-12 md:col-span-5 rounded-lg h-full border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
                    <div className="bg-[#DCFCE7] size-10 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-[#16A34A] size-6" />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm">Program (Group)</p>
                        <p className="font-semibold text-[#111827] text-lg">
                            {formValue.programName} ({formValue.groupName})
                        </p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3 h-full rounded-lg border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
                    <div className="bg-[#F3E8FF] size-10 rounded-lg flex items-center justify-center">
                        <Calendar className="text-[#9333EA] size-6" />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm">Level</p>
                        <p className="font-semibold text-[#111827] text-lg">
                            {formValue.levelName}
                        </p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 h-full rounded-lg border-2 bg-white border-[#E2E8F0] flex items-center p-6 gap-4">
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

            <div className="grid grid-cols-12 max-w-2xl mx-auto space-y-6 mt-6 w-full">
                <div className="col-span-12 w-full rounded-lg border-2 bg-white border-[#E2E8F0] flex flex-col items-start  mx-auto">
                    <div className="py-4 px-6 border-b w-full border-[#E2E8F0] gap-3">
                        <div className="gap-2 mx-auto flex justify-between items-center w-full">
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
                    </div>
                    <div className="w-full p-6">
                        <div className="w-full">
                            <p className="text-[#4B5563] text-sm">Jadwal Trial Class</p>
                            <p className="font-semibold text-[#111827] text-lg">
                                {moment(formValue.trialClassAt).format('dddd, D MMMM, HH:mm')}
                            </p>
                        </div>

                        <p className="mt-6 text-[#4B5563] text-sm">
                            Jadwal Kelas Mingguan{'  '}
                            {formValue.isUseSelfSchedule && (
                                <span className="text-primary font-medium ">
                                    (Jadwal Pilihan Sendiri)
                                </span>
                            )}
                        </p>
                        <div className=" grid grid-cols-1 mt-2 md:grid-cols-2 gap-6 w-full">
                            <div className="col-span-1">
                                <p className="font-semibold text-[#111827]">Jadwal Pertama</p>
                                <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-4">
                                    <Calendar className="text-[#CE6439] size-4" />
                                    <p className="text-sm">Hari</p>
                                    <p className="grow text-right font-semibold">
                                        {formValue.isUseSelfSchedule
                                            ? formValue.selfSchedule[0].dayOfWeek
                                            : renderDayToIndonesian(
                                                  formValue.studyGroupDetail?.schedule1
                                                      .dayOfWeek as string
                                              )}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                                    <Calendar className="text-[#CE6439] size-4" />
                                    <p className="text-sm">Jam</p>
                                    <p className="grow text-right font-semibold">
                                        {formValue.isUseSelfSchedule ? (
                                            <>
                                                {formValue.selfSchedule[0].startTime} -{' '}
                                                {moment(
                                                    formValue.selfSchedule[0].startTime,
                                                    'HH:mm'
                                                )
                                                    .add(90, 'minutes')
                                                    .format('HH:mm')}
                                            </>
                                        ) : (
                                            <>
                                                {moment(
                                                    formValue.studyGroupDetail?.schedule1.startTime,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}{' '}
                                                -{' '}
                                                {moment(
                                                    formValue.studyGroupDetail?.schedule1.endTime,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}
                                            </>
                                        )}
                                    </p>
                                </div>
                                {!formValue.isUseSelfSchedule && (
                                    <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                                        <User className="text-[#CE6439] size-4" />
                                        <p className="text-sm">Mentor</p>
                                        <p className="grow text-right font-semibold">
                                            {formValue.studyGroupDetail?.teacherTeamMemberName}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold text-[#111827]">Jadwal Kedua</p>
                                <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-4">
                                    <Calendar className="text-[#CE6439] size-4" />
                                    <p className="text-sm">Hari</p>
                                    <p className="grow text-right font-semibold">
                                        {formValue.isUseSelfSchedule ? (
                                            <>{formValue.selfSchedule[1].dayOfWeek}</>
                                        ) : (
                                            renderDayToIndonesian(
                                                formValue.studyGroupDetail?.schedule2
                                                    .dayOfWeek as string
                                            )
                                        )}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                                    <Calendar className="text-[#CE6439] size-4" />
                                    <p className="text-sm">Jam</p>
                                    <p className="grow text-right font-semibold">
                                        {formValue.isUseSelfSchedule ? (
                                            <>
                                                {formValue.selfSchedule[1].startTime} -{' '}
                                                {moment(
                                                    formValue.selfSchedule[1].startTime,
                                                    'HH:mm'
                                                )
                                                    .add(90, 'minutes')
                                                    .format('HH:mm')}
                                            </>
                                        ) : (
                                            <>
                                                {moment(
                                                    formValue.studyGroupDetail?.schedule2.startTime,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}{' '}
                                                -{' '}
                                                {moment(
                                                    formValue.studyGroupDetail?.schedule2.endTime,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}
                                            </>
                                        )}
                                    </p>
                                </div>
                                {!formValue.isUseSelfSchedule && (
                                    <div className="rounded-lg bg-[#F9FAFB] p-3 gap-4 flex items-center justify-between mt-2">
                                        <User className="text-[#CE6439] size-4" />
                                        <p className="text-sm">Mentor</p>
                                        <p className="grow text-right font-semibold">
                                            {formValue.studyGroupDetail?.teacherTeamMemberName}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryItem;
