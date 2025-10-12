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
import ScheduleCell from '@/features/schedule-management/components/schedule-cell';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        handleSubmit,
        register,
        formState,
        handleUpload,
        handleResetModal,
        isEdit,
        isLoadingCreate: isLoadingCreateTeacher,
        handleEdit,
        data,
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
    const { getBookingInfo } = useMapTeacherManagement(scheduleData?.schedules||[]);

    return (
        <DashboardContentLayout pageTitle="Teacher Management">
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-end mb-8">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Mentor
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
                        errors={errors}
                        onClose={handleResetModal}
                        onSubmit={handleSubmit}
                        onUpload={handleUpload}
                        register={register}
                        isEdit={isEdit}
                        isLoading={isLoadingCreateTeacher}
                        setValue={setValue}
                    />
                )}
                <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
                    <DialogTitle />
                    <DialogContent className={cn(inter.className, 'max-w-screen-xl')}>
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
                                                                {day}
                                                            </div>
                                                        </Skeleton>
                                                        {/* <Skeleton
                                                            loading={isLoadingSchedule}
                                                            className="h-4 w-12"
                                                        >
                                                            <div className="text-xs">
                                                                {scheduleData?.schedules.find(
                                                                (item) =>
                                                                    item.scheduleId ===
                                                                    teacher
                                                            )?.teacherAlias || ''}
                                                            </div>
                                                        </Skeleton> */}
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
                                                                timeSlot,
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
                </Dialog>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
