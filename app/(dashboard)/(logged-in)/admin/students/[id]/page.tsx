'use client';

import Overlay from '@/components/layout/overlay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { inter } from '@/constants/fonts';
import AdminSelect from '@/features/admin/components/admin-select';
import useChangeStudyGroup from '@/features/admin/hooks/useChangeStudyGroup';
import useEditNote from '@/features/admin/hooks/useEditNote';
import useGetStudyGroupDetail from '@/features/admin/queries/useGetStudyGroupDetail';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

export default function DashboardPage() {
    const { data, isLoading } = useGetProfileById();
    const { isEdit, setIsEdit, notes, setNotes, handleSave } = useEditNote(data?.notes);
    const { data: studyGroupDetail, isLoading: isLoadingStudyGroupDetail } = useGetStudyGroupDetail(
        data?.primaryStudyGroupId || 0
    );
    const {
        isOpen,
        setIsOpen,
        isLoading: isLoadingChangeStudy,
        studyGroups,
    } = useChangeStudyGroup(studyGroupDetail?.schedules[0].location || '');

    if (isLoading) return <Overlay />;
    return (
        <DashboardContentLayout pageTitle="Detail Student">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Detail Student Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden">
                            <div className="bg-secondary text-white p-4">
                                <h2 className="text-lg font-semibold">Detail Student</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Nama</p>
                                        <p className="font-semibold text-gray-900">{data?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">No. HP</p>
                                        <p className="font-semibold text-gray-900">082295102312</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Instagram</p>
                                        <p className="font-semibold text-gray-900">radityapppp</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Program</p>
                                        <p className="font-semibold text-gray-900">
                                            {data?.program}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Group</p>
                                        <p className="font-semibold text-gray-900">{data?.group}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Level</p>
                                        <p className="font-semibold text-gray-900">{data?.level}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Grade</p>
                                        <p className="font-semibold text-gray-900">
                                            {data?.gradeLabel || 'Belum ditentukan'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Catatan Section */}
                        <Card className="overflow-hidden">
                            <div className="bg-secondary text-white p-4">
                                <h2 className="text-lg font-semibold">Catatan</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid items-start">
                                    {!isEdit ? (
                                        <>
                                            <p className="text-gray-900 font-medium mb-4">
                                                {notes}
                                            </p>
                                            <Button
                                                onClick={() => setIsEdit(true)}
                                                className="px-6 w-fit ml-auto"
                                                size="sm"
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Textarea
                                                className="mb-4"
                                                value={notes}
                                                onChange={e => setNotes(e.target.value)}
                                            />
                                            <div className="space-x-3 ml-auto">
                                                <Button
                                                    onClick={() => setIsEdit(false)}
                                                    className="px-6 w-fit"
                                                    size="sm"
                                                    variant={'outline'}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleSave}
                                                    className="px-6 w-fit"
                                                    size="sm"
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Kelompok Belajar Section */}
                    <Skeleton loading={isLoadingStudyGroupDetail} className="h-40">
                        <div className="space-y-6">
                            <Card className="overflow-hidden">
                                <div className="bg-secondary text-white p-4">
                                    <h2 className="text-lg font-semibold">Kelompok Belajar</h2>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Cabang</p>
                                        <p className="font-semibold text-gray-900">
                                            {studyGroupDetail?.schedules[0]?.location || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Nama Kelompok</p>
                                        <p className="font-semibold text-gray-900">
                                            {studyGroupDetail?.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Teacher</p>
                                        <p className="font-semibold text-gray-900">
                                            {studyGroupDetail?.schedules[0].teacherMemberName ||
                                                '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Jadwal Trial Class
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {/* {data?.schedules} */} -
                                        </p>
                                    </div>
                                </div>
                                {studyGroupDetail?.schedules.map(schedule => (
                                    <div key={schedule.id} className="px-6 py-4 border-t">
                                        <p className="text-sm text-gray-600 mb-2">Jadwal Kelas 1</p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">
                                                        Hari
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {schedule.dayOfWeek}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">
                                                        Waktu
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {schedule.startTime.substring(0, 5)} -{' '}
                                                    {schedule.endTime.substring(0, 5)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="m-4">
                                    <Button
                                        onClick={() => setIsOpen(true)}
                                        className="w-full"
                                        size="lg"
                                    >
                                        Ganti Kelompok
                                    </Button>
                                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                        <DialogContent className={cn(inter.className)}>
                                            <DialogTitle>Ganti Kelompok</DialogTitle>
                                            <AdminSelect
                                                label="Kelompok Belajar"
                                                options={studyGroups || []}
                                            />
                                            <div>
                                                <Label className="mb-2 block">
                                                    Jadwal Trial Class
                                                </Label>
                                                <RadioGroup>
                                                    <div className="flex gap-4 items-center">
                                                        <RadioGroupItem value="1"></RadioGroupItem>
                                                        <p className="text-[#020217] text-sm">
                                                            Rabu, 18 Juni 2021
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-4 items-center">
                                                        <RadioGroupItem value="1"></RadioGroupItem>
                                                        <p className="text-[#020217] text-sm">
                                                            Rabu, 18 Juni 2021
                                                        </p>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={() => setIsOpen(false)}>
                                                    {!isLoadingChangeStudy
                                                        ? 'Ganti'
                                                        : 'Sedang mengganti...'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>
                        </div>
                    </Skeleton>
                </div>
            </div>
        </DashboardContentLayout>
    );
}
