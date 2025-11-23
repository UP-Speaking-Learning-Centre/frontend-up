'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { inter } from '@/constants/fonts';
import { days, timeSlots } from '@/constants/schedule';
import TeacherManagementCardList from '@/features/admin/components/teacher-management-card-list';
import TeacherManagementForm from '@/features/admin/components/teacher-management-form';
import useCreateTeacher from '@/features/admin/hooks/useCreateTeacher';
import useMapTeacherManagement from '@/features/admin/hooks/useMapTeacherManagement';
import useDeleteTeacher from '@/features/admin/queries/useDeleteTeacher';
import useGetTeacherSchedule from '@/features/admin/queries/useGetTeacherSchedule';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { ClassBlock } from '@/features/schedule-management/components/class-blocks';
import Legend from '@/features/schedule-management/components/legend';
import ScheduleCell from '@/features/schedule-management/components/schedule-cell';
import { getDayOfWeek } from '@/lib/date';
import { cn } from '@/lib/utils';
import { ScheduleItem } from '@/types/schedule';
import {
    calculateBlockHeight,
    getSchedulesByTeacherAndDay,
    timeToPixelOffsetFixed,
} from '@/utils/schedule';
import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        handleSubmit,
        register,
        formState,
        handleUpload,
        handleResetModal,
        isEdit,
        isLoading: isLoadingGetTeacher,
        isLoadingCreate: isLoadingCreateTeacher,
        handleEdit,
        data,
        value,
        id,
        setValue,
    } = useCreateTeacher(setIsModalOpen);
    const { mutateAsync } = useDeleteTeacher();
    const { errors } = formState;
    const {
        data: scheduleData,
        isLoading: isLoadingSchedule,
        handleOpenSchedule,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
    } = useGetTeacherSchedule();

    const { getBookingInfo } = useMapTeacherManagement(scheduleData?.schedules || []);

    const totalHours = 13; // 08:00 to 21:00 is 13 hours
    const gridHeight = totalHours * 80; // 80px per hour

    const generateSchedule = useCallback(
        ({ day }: { teacherId: string; day: string }) => {
            if (scheduleData) {
                const schedules = scheduleData.schedules.filter(
                    schedule => schedule.dayOfWeek === day && !!schedule.studyGroup
                );

                return schedules.map(schedule => {
                    const topOffset = timeToPixelOffsetFixed(schedule.startTime);
                    const height = calculateBlockHeight(schedule.startTime, schedule.endTime);

                    const scheduleMapped: ScheduleItem = {
                        ...schedule,
                        location: schedule.location.name,
                        studyGroupId: schedule.studyGroup?.id || null,
                        studyGroup: schedule.studyGroup?.name || null,
                        package: schedule.studyGroup?.packageName || null,
                        teacherMemberName: data?.memberName || '',
                        teacherAlias: data?.teacher.name || '',
                        teacherMemberId: data?.id || 0,
                        day: schedule.dayOfWeek,
                        totalStudent: schedule.totalActiveStudents,
                        notes: [],
                    };

                    return (
                        <ClassBlock
                            key={schedule.scheduleId}
                            classItem={scheduleMapped}
                            topOffset={topOffset}
                            height={height}
                        />
                    );
                });
            }
        },
        [scheduleData]
    );

    return (
        <DashboardContentLayout pageTitle="Teacher Management">
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Teacher
                        </Button>
                    </div>

                    {/* Mentor Cards Grid */}
                    <TeacherManagementCardList
                        onOpenSchedule={handleOpenSchedule}
                        onEdit={handleEdit}
                        onDelete={mutateAsync}
                    />
                </div>
                {isModalOpen && (
                    <TeacherManagementForm
                        teacherId={data?.teacher.id}
                        teacherName={data?.memberName}
                        details={data}
                        errors={errors}
                        value={value}
                        onClose={handleResetModal}
                        onSubmit={handleSubmit}
                        onUpload={handleUpload}
                        register={register}
                        isEdit={isEdit}
                        isLoadingGet={isLoadingGetTeacher}
                        isLoading={isLoadingCreateTeacher}
                        setValue={setValue}
                    />
                )}

                <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
                    <DialogTitle />
                    <DialogContent
                        className={cn(
                            inter.className,
                            'max-h-[calc(100vh-10rem)] max-md:mx-auto rounded-lg max-md:w-[calc(100%-2rem)] max-w-screen-xl'
                        )}
                    >
                        <Legend />
                        <Card className="overflow-y-auto max-h-[calc(100vh-20rem)] w-full">
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
                                        for (let hour = 8; hour <= 22; hour++) {
                                            const timeStr = `${String(hour).padStart(2, '0')}:00`;
                                            labels.push(
                                                <div
                                                    key={timeStr}
                                                    className="h-20 px-2 py-2 border-t border-x-[1px] border-border text-xs text-muted-foreground font-medium flex items-center justify-center"
                                                >
                                                    {timeStr}
                                                </div>
                                            );
                                        }
                                        return labels;
                                    })()}
                                </div>
                                {days.map(day => {
                                    return (
                                        <div
                                            key={day}
                                            className="w-[200px] shrink-0 border-x-[1px] border-border relative"
                                        >
                                            <div className="w-[200px] h-16 flex items-center justify-center p-3 text-center font-medium text-muted-foreground">
                                                <div className="space-y-1 flex items-center flex-col">
                                                    <Skeleton
                                                        loading={isLoadingSchedule}
                                                        className="h-6 w-20"
                                                    >
                                                        <div className="font-semibold text-foreground">
                                                            {getDayOfWeek(day)}
                                                        </div>
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
                                                    for (let hour = 8; hour < 22; hour++) {
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
                                                <div className="absolute w-[198px] inset-0 top-0">
                                                    {generateSchedule({
                                                        teacherId: String(id),
                                                        day,
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </DialogContent>
                </Dialog>
                {/* <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
                    <DialogTitle />
                    <DialogContent className={cn(inter.className, 'max-w-screen-xl')}>
                        <Legend />
                        <Card className="overflow-hidden w-full">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="sr-only p-3 text-left font-medium text-muted-foreground"></th>
                                            {days.map(day => (
                                                <th
                                                    key={day}
                                                    className="min-w-[140px] p-3 text-center font-medium text-muted-foreground"
                                                >
                                                    <div className="space-y-1 flex items-center flex-col">
                                                        <Skeleton
                                                            loading={isLoadingSchedule}
                                                            className="h-6 w-20"
                                                        >
                                                            <div className="font-semibold text-foreground">
                                                                {getDayOfWeek(day)}
                                                            </div>
                                                        </Skeleton>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map(timeSlot => (
                                            <tr key={timeSlot.display} className="border-b">
                                                <td className="p-3 font-medium text-sm text-muted-foreground whitespace-nowrap">
                                                    <Skeleton
                                                        loading={isLoadingSchedule}
                                                        className="h-14 w-20"
                                                    >
                                                        {timeSlot.display}
                                                    </Skeleton>
                                                </td>
                                                {days.map((day, index) => {
                                                    return (
                                                        <ScheduleCell
                                                            isTeacherManagement
                                                            loading={isLoadingSchedule}
                                                            key={`${day}-${index}`}
                                                            bookingInfo={getBookingInfo(
                                                                day,
                                                                timeSlot
                                                            )}
                                                            teacher={day}
                                                        />
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </DialogContent>
                </Dialog> */}
            </div>
        </DashboardContentLayout>
    );
};

export default page;
