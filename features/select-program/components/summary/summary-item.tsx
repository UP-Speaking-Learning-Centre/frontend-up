import React from 'react';
import useProgramSelectionStore from '../../stores/program-selection-store';
import { BookOpen, Calendar, Clock, MapPin, Sparkles, User } from 'lucide-react';
import { renderDayToIndonesian } from '@/lib/moment';
import moment from 'moment';
import { Schedule } from '@/types/study-group';

const SummaryItem = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);

    const schedules = formValue.isUseSelfSchedule
        ? formValue.selfSchedule
        : ([formValue.studyGroupDetail?.schedule1, formValue.studyGroupDetail?.schedule2].filter(
              Boolean
          ) as Schedule[]);

    const formatScheduleTime = (schedule: any) => {
        if (formValue.isUseSelfSchedule) {
            const start = schedule.startTime || '';
            const end = moment(start, 'HH:mm').isValid()
                ? moment(start, 'HH:mm').add(90, 'minutes').format('HH:mm')
                : '-';
            return `${start} - ${end}`;
        }

        const start = moment(schedule.startTime, 'HH:mm:ss').isValid()
            ? moment(schedule.startTime, 'HH:mm:ss').format('HH:mm')
            : schedule.startTime;
        const end =
            schedule.endTime && moment(schedule.endTime, 'HH:mm:ss').isValid()
                ? moment(schedule.endTime, 'HH:mm:ss').format('HH:mm')
                : moment(schedule.startTime, 'HH:mm:ss').isValid()
                  ? moment(schedule.startTime, 'HH:mm:ss')
                        .add(schedule.durationMinutes || 90, 'minutes')
                        .format('HH:mm')
                  : '-';

        return `${start} - ${end}`;
    };

    return (
        <div className="mx-auto max-w-3xl mt-6 px-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header overview banner */}
                <div className="bg-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white tracking-wide uppercase">
                            <Sparkles className="size-3" />
                            {formValue.packageName || 'Paket Pilihan'}
                        </span>
                        {formValue.locationName && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                                <MapPin className="size-3.5 text-primary" />
                                Cabang {formValue.locationName}
                            </span>
                        )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {formValue.programName || '-'}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                        {formValue.groupName && (
                            <span className="flex items-center gap-1.5">
                                <span className="text-slate-400">Grup:</span>
                                <strong className="text-white font-medium">
                                    {formValue.groupName}
                                </strong>
                            </span>
                        )}
                        {formValue.levelName && (
                            <>
                                <span className="text-slate-500">•</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="text-slate-400">Level:</span>
                                    <strong className="text-white font-medium">
                                        {formValue.levelName}
                                    </strong>
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    {/* Trial Class Notice / Highlight */}
                    {formValue.trialClassAt && (
                        <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-amber-800/80">
                                        Jadwal Free Trial Class
                                    </p>
                                    <p className="text-base sm:text-lg font-bold text-slate-900 capitalize">
                                        {moment(formValue.trialClassAt).format('dddd, D MMMM YYYY')}
                                    </p>
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold text-sm shadow-2xs">
                                <Clock className="size-4 text-amber-600" />
                                {moment(formValue.trialClassAt).format('HH:mm')} WIB
                            </div>
                        </div>
                    )}

                    {/* Weekly Schedules */}
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h4 className="text-base font-semibold text-slate-900">
                                    Jadwal Kelas Mingguan
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {formValue.isUseSelfSchedule
                                        ? 'Jadwal kustom pilihan Anda sendiri'
                                        : 'Sesuai dengan kelompok belajar yang dipilih'}
                                </p>
                            </div>
                            {formValue.isUseSelfSchedule && (
                                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                                    Custom Schedule
                                </span>
                            )}
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {schedules.map((schedule: any, index: number) => {
                                const dayText = formValue.isUseSelfSchedule
                                    ? schedule.dayOfWeek
                                    : renderDayToIndonesian(schedule.dayOfWeek);

                                return (
                                    <div
                                        key={index}
                                        className="relative p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Pertemuan {index + 1}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                                                <Calendar className="size-3 text-primary" />
                                                {dayText}
                                            </span>
                                        </div>

                                        <div className="space-y-1.5 pt-1">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Clock className="size-4 text-slate-400 shrink-0" />
                                                <span className="text-sm font-semibold text-slate-900">
                                                    {formatScheduleTime(schedule)}
                                                </span>
                                            </div>

                                            {!formValue.isUseSelfSchedule &&
                                                formValue.studyGroupDetail
                                                    ?.teacherTeamMemberName && (
                                                    <div className="flex items-center gap-2 text-slate-600 text-xs pt-1">
                                                        <User className="size-4 text-slate-400 shrink-0" />
                                                        <span>
                                                            Mentor:{' '}
                                                            <strong className="text-slate-800 font-medium">
                                                                {
                                                                    formValue.studyGroupDetail
                                                                        .teacherTeamMemberName
                                                                }
                                                            </strong>
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryItem;
