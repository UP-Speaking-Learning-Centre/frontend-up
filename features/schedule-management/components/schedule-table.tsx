import { useCallback, useMemo } from 'react';
import { useGetTeacherScheduleQuery } from '../queries/use-get-teacher-schedule';
import {
    getUniqueTeachers,
    getDaysOfWeek,
    getFixedDayRange,
    getSchedulesByTeacherAndDay,
    timeToPixelOffsetFixed,
    calculateBlockHeight,
} from '@/utils/schedule';
import { ClassBlock } from './class-blocks';
import { ScheduleItem } from '@/types/schedule';
import { Skeleton } from '@/components/ui/skeleton';
import { dayNames } from '@/constants/schedule';

function TeacherScheduleGrid() {
    const { data, isLoading: isLoadingSchedule } = useGetTeacherScheduleQuery();
    const teachers = useMemo(() => getUniqueTeachers(data as ScheduleItem[]), [data]);
    const days = useMemo(() => getDaysOfWeek(), [data]);

    const totalHours = 13; // 08:00 to 21:00 is 13 hours
    const gridHeight = totalHours * 80; // 80px per hour

    const generateSchedule = useCallback(
        ({ teacherId, day }: { teacherId: string; day: string }) => {
            if (data) {
                const schedules = getSchedulesByTeacherAndDay(data, teacherId, day);

                return schedules.map(schedule => {
                    const topOffset = timeToPixelOffsetFixed(schedule.startTime);
                    const height = calculateBlockHeight(schedule.startTime, schedule.endTime);

                    return (
                        <ClassBlock
                            key={schedule.scheduleId}
                            classItem={schedule}
                            topOffset={topOffset}
                            height={height}
                        />
                    );
                });
            }
        },
        [data]
    );

    return (
        <div className="space-y-8">
            {days.map((day, idx) => {
                const daySchedules = data?.filter(s => s.day === day && s.studyGroup);

                return (
                    <div key={day} className="overflow-hidden">
                        {/* Day Header */}
                        <div className="pb-3">
                            <div className="flex items-center gap-4">
                                <Skeleton loading={isLoadingSchedule} className="h-8 w-32">
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        {dayNames[idx]}
                                    </h2>
                                </Skeleton>
                                <div className="flex-1 border-t border-2 border-border"></div>
                            </div>
                            {daySchedules && (
                                <p className="text-sm text-muted-foreground">
                                    {daySchedules.length} kelas
                                </p>
                            )}
                        </div>

                        {/* Grid for this day */}
                        <div className="flex overflow-x-auto bg-card rounded-lg border border-border">
                            {/* Time labels column */}
                            <div className="w-24 sticky left-0 z-10 flex-shrink-0 bg-background">
                                {(() => {
                                    const labels = [
                                        <div
                                            className="h-16 border-r border-border"
                                            key="empty"
                                        ></div>,
                                    ];
                                    for (let hour = 5; hour <= 22; hour++) {
                                        const timeStr = `${String(hour).padStart(2, '0')}:00`;
                                        labels.push(
                                            <div
                                                key={timeStr}
                                                className="h-20 px-2 py-2 border-t border-r border-border text-xs text-muted-foreground font-medium flex items-center justify-center"
                                            >
                                                {timeStr}
                                            </div>
                                        );
                                    }
                                    return labels;
                                })()}
                            </div>

                            {/* Teacher columns */}
                            {teachers.map(teacher => (
                                <div
                                    key={teacher.id}
                                    className="w-[200px] border-r border-border [&:nth-child(2)]:border-l relative"
                                >
                                    {/* Column header */}
                                    <div
                                        key={teacher.id}
                                        className="w-[200px] flex items-center justify-center p-3 text-center font-medium text-muted-foreground"
                                    >
                                        <div className="space-y-1 flex items-center flex-col">
                                            <Skeleton
                                                loading={isLoadingSchedule}
                                                className="h-6 w-20"
                                            >
                                                <div className="font-semibold text-foreground">
                                                    {teacher.name}
                                                </div>
                                            </Skeleton>
                                            <Skeleton
                                                loading={isLoadingSchedule}
                                                className="h-4 w-12"
                                            >
                                                <div className="text-xs">{teacher.alias || ''}</div>
                                            </Skeleton>
                                        </div>
                                    </div>

                                    {/* Grid background and classes */}
                                    <div
                                        style={{
                                            height: `${gridHeight}px`,
                                            position: 'relative',
                                        }}
                                        className="border-t border-border w-[200px]"
                                    >
                                        {/* Background grid lines */}
                                        {(() => {
                                            const items = [];
                                            for (let hour = 5; hour < 22; hour++) {
                                                items.push(
                                                    <div
                                                        key={`bg-${hour}`}
                                                        className={`h-20 w-[200px] border-b border-border ${
                                                            hour % 2 === 0
                                                                ? 'bg-muted/10'
                                                                : 'bg-muted/30'
                                                        }`}
                                                    />
                                                );
                                            }
                                            return items;
                                        })()}

                                        {/* Scheduled classes */}
                                        <div className="absolute w-[200px] inset-0 top-0">
                                            {data &&
                                                generateSchedule({
                                                    teacherId: teacher.id,
                                                    day,
                                                })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TeacherScheduleGrid;
