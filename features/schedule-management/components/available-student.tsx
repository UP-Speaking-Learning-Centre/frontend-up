'use client';
import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useGetAvailableStudentQuery } from '../queries/use-get-available-student';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { Button } from '@/components/ui/button';
import { useAssignStudentToStudyGroupMutation } from '../queries/use-assign-student-to-studygroup';
import { Skeleton } from '@/components/ui/skeleton';
import { AvailableStudentForStudyGroup } from '@/types/students';
import { MinusCircleIcon, Plus, PlusCircleIcon } from 'lucide-react';
import { MAX_STUDENT } from '@/constants/programs';
import { useGetStudentOfStudyGroupQuery } from '../queries/use-get-student-of-study-group';
import { cn } from '@/lib/utils';

const AvailableStudent = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { isLoading } = useGetAvailableStudentQuery();
    const { data: studentOfStudyGroup } = useGetStudentOfStudyGroupQuery();

    const [keyword, setKeyword] = useState('');
    const selectedStudyGroup = useScheduleManagementStore(s => s.selectedStudyGroup);
    const listAvailableStudent = useScheduleManagementStore(s => s.listAvailableStudent);
    const setListAvailableStudent = useScheduleManagementStore(s => s.setListAvailableStudent);
    const { mutateAsync, isPending } = useAssignStudentToStudyGroupMutation();
    const [selectedStudent, setSelectedStudent] = useState<AvailableStudentForStudyGroup[]>([]);

    const availabelStudents = useMemo(
        () =>
            listAvailableStudent
                ?.filter(
                    student =>
                        student.program === selectedStudyGroup?.program &&
                        student.group === selectedStudyGroup?.group &&
                        student.level === selectedStudyGroup?.level
                )
                .filter(student => student.name.toLowerCase().includes(keyword.toLowerCase())),
        [listAvailableStudent, selectedStudyGroup, keyword]
    );

    const isDisabledAddStudent = useMemo(() => {
        const studyGroupPackage = selectedStudyGroup?.package;
        const maxStudent = MAX_STUDENT[studyGroupPackage?.name as keyof typeof MAX_STUDENT];
        return selectedStudent.length + (studentOfStudyGroup?.students?.length || 0) >= maxStudent;
    }, [selectedStudent, studentOfStudyGroup, selectedStudyGroup]);

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(5)].map((_, index) => (
                <Skeleton className="h-6 w-full" key={index} />
            ));
        }

        if (availabelStudents?.length === 0) {
            return <p>Tidak ada student tersedia</p>;
        }

        return availabelStudents?.map(student => (
            <div key={student.id}>
                <div className="flex items-center gap-2 justify-between border-b border-[#E5E7EB] p-2">
                    <p className="text-base text-[#020817]">{student.name}</p>
                    <PlusCircleIcon
                        className={cn(
                            'w-6 h-6',
                            isDisabledAddStudent
                                ? 'cursor-not-allowed text-neutral-500'
                                : 'cursor-pointer text-primary'
                        )}
                        onClick={() => {
                            if (isDisabledAddStudent) return;

                            setListAvailableStudent(
                                listAvailableStudent.filter(s => s.id !== student.id)
                            );
                            setSelectedStudent([...selectedStudent, student]);
                        }}
                    />
                </div>
            </div>
        ));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="md:w-[800px] max-w-7xl">
                <DialogTitle>Daftar Student Tersedia</DialogTitle>
                <div className="grid grid-cols-2 h-[calc(100vh-30rem)] overflow-hidden gap-4">
                    <div className="col-span-1">
                        <input
                            type="text"
                            placeholder="Cari Student"
                            className="p-2 py-4 border rounded-md w-full"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />
                        <div className="flex flex-col mt-2 gap-4 max-h-[calc(100vh-35rem)] overflow-y-auto">
                            {renderContent()}
                        </div>
                    </div>

                    <div className="border-l-2 border-secondary pl-4">
                        <div className="flex flex-col mt-2 gap-4 max-h-[calc(100vh-30rem)] overflow-y-auto">
                            <p className="text-lg text-[#020817]">Student yang dipilih</p>

                            {selectedStudent.map(student => (
                                <div key={student.id}>
                                    <div className="flex items-center gap-2 justify-between border-b border-[#E5E7EB] p-2">
                                        <p className="text-base text-[#020817]">{student.name}</p>
                                        <MinusCircleIcon
                                            className="w-6 h-6 cursor-pointer text-primary"
                                            onClick={() =>
                                                setSelectedStudent(
                                                    selectedStudent.filter(s => s.id !== student.id)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="default"
                                disabled={!selectedStudent.length}
                                onClick={() => {
                                    mutateAsync(
                                        {
                                            studyGroupId: selectedStudyGroup?.id as number,
                                            studentIds: selectedStudent.map(s => s.id),
                                            markFullScheduleId: 0,
                                        },
                                        {
                                            onSuccess: () => {
                                                onOpenChange(false);
                                            },
                                        }
                                    );
                                }}
                            >
                                {isPending ? (
                                    'Menambahkan...'
                                ) : (
                                    <>
                                        <Plus /> Tambah Anggota
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AvailableStudent;
