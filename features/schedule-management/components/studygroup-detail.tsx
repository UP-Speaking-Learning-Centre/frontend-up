'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

import { Skeleton } from '@/components/ui/skeleton';
import { renderDayToIndonesian } from '@/lib/moment';
import { Plus } from 'lucide-react';
import { useGetStudentOfStudyGroupQuery } from '../queries/use-get-student-of-study-group';
import { useGetStudyGroupDetailQuery } from '../queries/use-get-study-group-detail';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import AddNewStudyGroupTrigger from './add-new-study-group/trigger';
import { useUpdatePriorityMutation } from '../queries/use-update-priority';
import { useGetAvailableStudentQuery } from '../queries/use-get-available-student';
import AvailableStudent from './available-student';
import { useState } from 'react';
import { useUnassignStudentFromStudyGroupMutation } from '../queries/use-unassign-student-from-studygroup';

const StudyGroupDetail = ({
    isTeacherManagement,
    closeDetailPopup,
}: {
    isTeacherManagement?: boolean;
    closeDetailPopup: () => void;
}) => {
    const { isLoading } = useGetStudyGroupDetailQuery();
    const { data: studentOfStudyGroup, isLoading: studentOfStudyGroupLoading } =
        useGetStudentOfStudyGroupQuery();

    const [openAddStudent, setOpenAddStudent] = useState(false);
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const selectedStudyGroup = useScheduleManagementStore(s => s.selectedStudyGroup);
    const { mutateAsync, isPending: updatePriorityLoading } = useUpdatePriorityMutation();
    const { mutateAsync: unassignStudentFromStudyGroup } =
        useUnassignStudentFromStudyGroupMutation();

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
                    {!isTeacherManagement && (
                        <AddNewStudyGroupTrigger closeDetailPopup={closeDetailPopup} />
                    )}
                </div>
            </DialogContent>
        );
    }

    return (
        <DialogContent className="w-[600px] max-w-7xl max-h-screen">
            <DialogTitle>Detail Kelompok Belajar</DialogTitle>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                    <div className="p-3 bg-secondary rounded-md">
                        <div className="flex flex-col bg-white p-2 rounded-md">
                            <p className="text-xs text-[#9CA3AF]">Nama Kelompok</p>
                            <Skeleton className="w-20 h-4" loading={isLoading}>
                                <p className="text-base text-[#020817]">
                                    {selectedStudyGroup?.name}
                                </p>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Teacher</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {selectedStudyGroup?.schedules[0].teacherMemberName}
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Package</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {selectedStudyGroup?.package.name}
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Status Prioritas</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-primary">
                                {selectedStudyGroup?.isPriority ? 'Prioritas' : 'Tidak Prioritas'}
                            </p>
                            <Button
                                size="sm"
                                onClick={() =>
                                    mutateAsync({
                                        isPriority: !selectedStudyGroup?.isPriority,
                                        studyGroupId: (selectedStudyGroup?.id as number) || 0,
                                    })
                                }
                            >
                                {updatePriorityLoading
                                    ? 'Loading...'
                                    : selectedStudyGroup?.isPriority
                                    ? 'Batalkan Prioritas'
                                    : 'Prioritaskan'}
                            </Button>
                        </Skeleton>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Program</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {selectedStudyGroup?.program}
                            </p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Group</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">{selectedStudyGroup?.group}</p>
                        </Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[#9CA3AF]">Level (Grade)</p>
                        <Skeleton className="w-20 h-4" loading={isLoading}>
                            <p className="text-base text-[#020817]">
                                {selectedStudyGroup?.level} ({selectedStudyGroup?.grade})
                            </p>
                        </Skeleton>
                    </div>
                </div>
                <div className="bg-secondary rounded-md p-3">
                    <div className="rounded-md h-full flex flex-col justify-between bg-white p-2 space-y-3">
                        <div className="flex flex-col">
                            <p className="text-base font-semibold">Jadwal 1</p>
                            <Skeleton className="w-20 h-4" loading={isLoading}>
                                <div className="text-base text-[#020817]">
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-xs text-neutral-500">Hari:</p>
                                        <p className="text-sm">
                                            {renderDayToIndonesian(
                                                selectedStudyGroup?.schedules[0]
                                                    ?.dayOfWeek as string
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-xs text-neutral-500">Mulai:</p>
                                        <p className="text-sm">
                                            {selectedStudyGroup?.schedules[0]?.startTime}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-xs text-neutral-500">Selesai:</p>
                                        <p className="text-sm">
                                            {selectedStudyGroup?.schedules[0]?.endTime}
                                        </p>
                                    </div>
                                </div>
                            </Skeleton>
                        </div>
                        {selectedStudyGroup?.schedules.length === 2 && (
                            <div className="flex flex-col">
                                <p className="text-base font-semibold">Jadwal 2</p>
                                <Skeleton className="w-20 h-4" loading={isLoading}>
                                    <div className="text-base text-[#020817]">
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-xs text-neutral-500">Hari:</p>
                                            <p className="text-sm">
                                                {renderDayToIndonesian(
                                                    selectedStudyGroup?.schedules[1]
                                                        ?.dayOfWeek as string
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-xs text-neutral-500">Mulai:</p>
                                            <p className="text-sm">
                                                {selectedStudyGroup?.schedules[1]?.startTime}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-xs text-neutral-500">Selesai:</p>
                                            <p className="text-sm">
                                                {selectedStudyGroup?.schedules[1]?.endTime}
                                            </p>
                                        </div>
                                    </div>
                                </Skeleton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Card className="bg-secondary p-3">
                <div className=" flex items-center justify-between font-semibold rounded-md  bg-white text-black p-3">
                    <p className="font-lg">Anggota Kelompok</p>
                </div>
                <div className="bg-white p-3  rounded-md mt-3">
                    <div className="space-y-2">
                        {studentOfStudyGroupLoading
                            ? [...new Array(6)].map((_, index) => (
                                  <Skeleton key={index} className="w-40 h-5" />
                              ))
                            : studentOfStudyGroup?.students.map((student, index) => (
                                  <div
                                      className="flex items-center justify-start gap-2"
                                      key={index}
                                  >
                                      <p className="font-normal">
                                          {index + 1}. {student.studentName}
                                      </p>
                                      <Button
                                          size="sm"
                                          onClick={() =>
                                              unassignStudentFromStudyGroup({
                                                  studentIds: [student.studentId],
                                                  hard: true,
                                              })
                                          }
                                      >
                                          Hapus
                                      </Button>
                                  </div>
                              ))}
                    </div>
                    {isTeacherManagement || (
                        <>
                            <div className="flex items-center justify-center mt-6">
                                <Button
                                    variant="ghost"
                                    className="text-primary"
                                    onClick={() => setOpenAddStudent(true)}
                                >
                                    <Plus />
                                    Tambah Anggota
                                </Button>
                            </div>
                            {openAddStudent && (
                                <AvailableStudent
                                    open={openAddStudent}
                                    onOpenChange={setOpenAddStudent}
                                />
                            )}
                        </>
                    )}
                </div>
            </Card>
        </DialogContent>
    );
};

export default StudyGroupDetail;
