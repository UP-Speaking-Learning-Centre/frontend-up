'use client';

import Overlay from '@/components/layout/overlay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { inter } from '@/constants/fonts';
import AdminSelect from '@/features/admin/components/admin-select';
import useChangeStudyGroup from '@/features/admin/hooks/useChangeStudyGroup';
import useEditNote from '@/features/admin/hooks/useEditNote';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

export default function DashboardPage() {
    const { isEdit, setIsEdit } = useEditNote();
    const {
        isOpen,
        setIsOpen,
        grades,
        isLoading: isLoadingChangeStudy,
        studyGroups,
    } = useChangeStudyGroup();
    const { data, isLoading } = useGetProfileById();

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
                                        <p className="font-semibold text-gray-900">
                                            {data?.name}
                                        </p>
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
                                            {data?.programName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Group</p>
                                        <p className="font-semibold text-gray-900">{data?.groupName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Level</p>
                                        <p className="font-semibold text-gray-900">{data?.levelName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Grade</p>
                                        <p className="font-semibold text-gray-900">
                                            {data?.gradeNumber || "Belum ditentukan"}
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
                                                Murid kurengg
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
                                            <Textarea className="mb-4">Murid kurengg</Textarea>
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
                                                    onClick={() => setIsEdit(false)}
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
                    <div className="space-y-6">
                        <Card className="overflow-hidden">
                            <div className="bg-secondary text-white p-4">
                                <h2 className="text-lg font-semibold">Kelompok Belajar</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Cabang</p>
                                    <p className="font-semibold text-gray-900">Stadion</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Nama Kelompok</p>
                                    <p className="font-semibold text-gray-900">Penerbang Roket</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Teacher</p>
                                    <p className="font-semibold text-gray-900">Mr. Firdan</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Jadwal Trial Class</p>
                                    <p className="font-semibold text-gray-900">
                                        Senin, 10 Oktober 2025, 15:00 - 17:30
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t">
                                <p className="text-sm text-gray-600 mb-2">Jadwal Kelas 1</p>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm text-gray-600">Hari</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">Senin</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm text-gray-600">Waktu</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            15:00 - 17:00
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t">
                                <p className="text-sm text-gray-600 mb-2">Jadwal Kelas 2</p>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm text-gray-600">Hari</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">Selasa</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm text-gray-600">Waktu</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            15:00 - 17:00
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    className="w-full"
                                    size="lg"
                                >
                                    Ganti Kelompok
                                </Button>
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTitle />
                                    <DialogContent className={cn(inter.className)}>
                                        <h2 className="font-medium">Ganti Kelompok</h2>
                                        <AdminSelect label="Grade" options={grades || []} />
                                        <AdminSelect
                                            label="Kelompok Belajar"
                                            options={studyGroups || []}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardContentLayout>
    );
}
