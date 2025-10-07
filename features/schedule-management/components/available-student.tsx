'use client';
import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useGetAvailableStudentQuery } from '../queries/use-get-available-student';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { Button } from '@/components/ui/button';
import { useAssignStudentToStudyGroupMutation } from '../queries/use-assign-student-to-studygroup';

const AvailableStudent = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { data } = useGetAvailableStudentQuery();
    const [keyword, setKeyword] = useState('');
    const selectedStudyGroup = useScheduleManagementStore(s => s.selectedStudyGroup);
    const { mutateAsync, isPending } = useAssignStudentToStudyGroupMutation();

    const availabelStudents = useMemo(
        () =>
            data
                ?.filter(
                    student =>
                        student.program === selectedStudyGroup?.program &&
                        student.group === selectedStudyGroup?.group &&
                        student.level === selectedStudyGroup?.level
                )
                .filter(student => student.name.toLowerCase().includes(keyword.toLowerCase())),
        [data, selectedStudyGroup, keyword]
    );

    const renderContent = () => {
        if (availabelStudents?.length === 0) {
            return <p>Tidak ada student tersedia</p>;
        }

        return availabelStudents?.map(student => (
            <div key={student.id}>
                <div className="flex items-center gap-2 justify-between border-b border-[#E5E7EB] p-2">
                    <p className="text-base text-[#020817]">{student.name}</p>
                    <Button
                        size="sm"
                        onClick={() =>
                            mutateAsync({
                                studyGroupId: selectedStudyGroup?.id as number,
                                studentIds: [student.id],
                                markFullScheduleId: 0,
                            })
                        }
                    >
                        Tambah
                    </Button>
                </div>
            </div>
        ));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Daftar Student Tersedia</DialogTitle>
                <input
                    type="text"
                    placeholder="Cari student"
                    className="p-2 border rounded-md"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <div className="flex flex-col mt-2 gap-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
                    {renderContent()}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AvailableStudent;
