'use client';

import Overlay from '@/components/layout/overlay';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { inter } from '@/constants/fonts';
import { days, timeSlots } from '@/constants/schedule';
import useCreateTeacher from '@/features/admin/hooks/useCreateTeacher';
import useDeleteTeacher from '@/features/admin/queries/useDeleteTeacher';
import useGetLocation from '@/features/admin/queries/useGetLocation';
import useGetTeachers from '@/features/admin/queries/useGetTeachers';
import useGetTeacherSchedule from '@/features/admin/queries/useGetTeacherSchedule';
import { useTeacherManagementStore } from '@/features/admin/stores/teacher';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import ScheduleCell from '@/features/schedule-management/components/schedule-cell';
import useMapTeacherSchedule from '@/features/schedule-management/hooks/use-map-teacher-schedule';
import { useGetTeacherScheduleQuery } from '@/features/schedule-management/queries/use-get-teacher-schedule';
import { cn } from '@/lib/utils';
import { ScheduleItem, TeacherScheduleResponse } from '@/types/schedule';
import { Calendar, Edit, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const { isLoading } = useGetTeachers();
    const { handleSubmit, register, formState, handleUpload, setId, handleResetModal, isEdit } =
        useCreateTeacher(setIsModalOpen);
    const { mutateAsync } = useDeleteTeacher();
    const { errors } = formState;
    const { data, isLoading: isLoadingLocation } = useGetLocation();
    const { data: scheduleData, isLoading: isLoadingSchedule } = useGetTeacherSchedule();
    const {} = useMapTeacherSchedule({data: scheduleData?.schedules as TeacherScheduleResponse})

    const teachers = useTeacherManagementStore(s => s.teacher);

    if (isLoading || isLoadingLocation) return <Overlay />;

    return (
        <DashboardContentLayout pageTitle="Teacher Management">
            <div className="min-h-screen bg-gray-50 p-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teachers.map((mentor, index) => (
                            <Card
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between p-4 pb-2">
                                    <h3 className="font-semibold text-gray-900">
                                        {mentor.memberName}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => setIsScheduleModalOpen(true)}
                                            variant={'outline'}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setId(1);
                                            }}
                                            variant={'outline'}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className="p-3 hover:bg-gray-100 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className={inter.className}>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure want to delete this teacher?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will
                                                        permanently delete the teacher and remove
                                                        your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => mutateAsync(mentor.id)}
                                                    >
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="px-4 pb-3">
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                                        <Image
                                            src={mentor.photoUrl || '/placeholder.svg'}
                                            alt={mentor.memberName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="px-4 pb-3">
                                    <Badge className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
                                        {mentor.teacher.name}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <div className="px-4 pb-4">
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {mentor.memberName}
                                    </p>

                                    {/* Available Locations */}
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm mb-2">
                                            Available Locations:
                                        </p>
                                        <p className="text-gray-700 text-sm font-medium border rounded-full w-fit px-3">
                                            {/* {mentor.location} */}
                                            Lokasi Belum
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {isEdit && 'Edit '}Detail Ms. Feby
                                </h2>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => handleResetModal()}
                                    className="p-1 hover:bg-gray-100 rounded w-10"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </Button>
                            </div>

                            {/* Modal Content */}
                            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
                                {/* Nama Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Nama
                                    </label>
                                    <Input
                                        type="text"
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2',
                                            errors.memberName && 'border-red-500'
                                        )}
                                        {...register('memberName')}
                                    />
                                    {errors.memberName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.memberName.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Foto Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Foto
                                    </label>
                                    <Input
                                        type="file"
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2',
                                            errors.photoUrl && 'border-red-500'
                                        )}
                                        onChange={handleUpload}
                                    />
                                    {errors.photoUrl && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.photoUrl.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi Field */}
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Deskripsi
                                    </label>
                                    <Textarea
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] resize-none',
                                            errors.description && 'border-red-500'
                                        )}
                                        {...register('description')}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description.message?.toString()}
                                        </p>
                                    )}
                                </div> */}

                                {/* Alias Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Alias
                                    </label>
                                    <Input
                                        type="text"
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2',
                                            errors.teacherId && 'border-red-500'
                                        )}
                                        {...register('teacherId')}
                                    />
                                    {errors.teacherId && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.teacherId.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Lokasi Mengajar Section */}
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Lokasi Mengajar
                                    </label>
                                    <RadioGroup className="space-y-1" {...register('location')}>
                                        {data?.map(item => (
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={item.id.toString()} />
                                                <label
                                                    htmlFor="location1"
                                                    className="text-sm text-gray-900"
                                                >
                                                    {item.name}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.location.message?.toString()}
                                        </p>
                                    )}
                                </div> */}

                                {/* Edit Button */}
                                <div className="flex justify-end pt-4">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg">
                                        {isEdit ? 'Edit' : 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
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
                                                {days.map((teacher, index) => {
                                                    return (
                                                        <ScheduleCell
                                                            loading={isLoadingSchedule}
                                                            key={`${teacher}-${index}`}
                                                            bookingInfo={{
                                                                isAvailable: true,
                                                                name: 'Tersedia',
                                                                color: 'border',
                                                            }}
                                                            teacher={teacher}
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
