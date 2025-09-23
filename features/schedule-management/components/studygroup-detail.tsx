'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import { useGetStudyGroupDetailQuery } from '../queries/use-get-study-group-detail';
import { useGetStudentOfStudyGroupQuery } from '../queries/use-get-student-of-study-group';
import { renderDayToIndonesian } from '@/lib/moment';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import AddNewStudyGroupTrigger from './add-new-study-group/trigger';

const StudyGroupDetail = () => {
    const { data, isLoading } = useGetStudyGroupDetailQuery();
    const { data: studentOfStudyGroup, isLoading: studentOfStudyGroupLoading } =
        useGetStudentOfStudyGroupQuery();
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);

    console.log('asdsa');
    if (studyGroupId === 0) {
        return (
            <DialogContent>
                <DialogTitle className="sr-only">Jadwal Belum Terisi</DialogTitle>

                <div className="flex items-center flex-col gap-8 p-6 justify-center">
                    <div>
                        <h4 className="text-center text-2xl font-semibold">Jadwal Belum Terisi</h4>
                        <p className="text-center text-base mt-1 font-normal">
                            Belum ada kelompok belajar yang mengisi jadwal ini
                        </p>
                    </div>
                    <AddNewStudyGroupTrigger />
                </div>
            </DialogContent>
        );
    }

    return (
        <DialogContent className="w-[600px] max-w-7xl max-h-screen">
            <DialogTitle>Detail Kelompok Belajar</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Nama Kelompok</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">{data?.name}</p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Teacher</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {data?.schedules[0].teacherMemberName}
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Jadwal 1</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {renderDayToIndonesian(data?.schedules[0].dayOfWeek as string)},{' '}
                                {data?.schedules[0].startTime} - {data?.schedules[0].endTime}
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Jadwal 2</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {renderDayToIndonesian(data?.schedules[1].dayOfWeek as string)},{' '}
                                {data?.schedules[1].startTime} - {data?.schedules[1].endTime}
                            </p>
                        </Skeleton>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Program</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">{data?.program}</p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Group</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">{data?.group}</p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Level (Grade)</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {data?.level} ({data?.grade})
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#9CA3AF]">Package</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">{data?.package.name}</p>
                        </Skeleton>
                    </div>
                </div>
            </div>
            <Card className="bg-secondary p-3">
                <div className=" flex items-center justify-between font-semibold rounded-md  bg-white text-black p-3">
                    <p className="font-lg">Anggota Kelompok</p>
                </div>
                <div className="bg-white p-3  rounded-md mt-3">
                    <div className="space-y-1">
                        {studentOfStudyGroupLoading
                            ? [...new Array(6)].map((_, index) => (
                                  <Skeleton key={index} className="w-40 h-5" />
                              ))
                            : studentOfStudyGroup?.map((student, index) => (
                                  <p key={index} className="font-normal">
                                      {index + 1}. {student.name}
                                  </p>
                              ))}
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Button variant="ghost" className="text-primary">
                            <Plus />
                            Tambah Anggota
                        </Button>
                    </div>
                </div>
            </Card>
        </DialogContent>
    );
};

export default StudyGroupDetail;
