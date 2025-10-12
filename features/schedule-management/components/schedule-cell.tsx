'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Plus, Star, StarIcon } from 'lucide-react';
import { useState } from 'react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import StudyGroupDetail from './studygroup-detail';

interface BookingInfo {
    isAvailable: boolean;
    name: string;
    isPriority?: boolean;
    students?: number;
    color: string;
    studyGroupId?: number;
}

interface ScheduleCellProps {
    bookingInfo: BookingInfo | null;
    teacher: string;
    loading: boolean;
    isTeacherManagement?: boolean;
}

const ScheduleCell = (props: ScheduleCellProps) => {
    const { bookingInfo, teacher, loading, isTeacherManagement } = props;
    console.log(bookingInfo);
    
    const { isAvailable, name, color, isPriority, students } = bookingInfo || {};
    const [openDetail, setOpenDetail] = useState(false);
    const setStudyGroupId = useScheduleManagementStore(s => s.setStudyGroupId);

    const studyGroupId = bookingInfo?.studyGroupId || 0;
    const onCloseDialog = () => {
        setOpenDetail(false);
        setStudyGroupId(0);
    };

    const onClickCell = () => {
        setOpenDetail(true);
        if (!isAvailable) {
            setStudyGroupId(studyGroupId);
        } else {
            setStudyGroupId(0);
        }
    };

    return (
        <>
            <td key={teacher} className="p-2">
                <Skeleton className="h-14 w-full" loading={loading}>
                    {bookingInfo ? (
                        <div
                            onClick={onClickCell}
                            className={cn(
                                'rounded-md p-2 min-h-14 relative cursor-pointer text-center flex flex-col justify-center items-center text-xs font-no',
                                color
                            )}
                        >
                            {!isAvailable ? (
                                <div className="space-y-1">
                                    <div className="font-semibold">{name}</div>
                                    <div>Student: {students}</div>
                                </div>
                            ) : (
                                <div>{name}</div>
                            )}
                            {isPriority && <PriorityTag />}
                        </div>
                    ) : (
                        <div className="rounded-md bg-gray-100 p-2 text-center text-xs text-gray-400">
                            -
                        </div>
                    )}
                </Skeleton>
            </td>

            {openDetail && (
                <Dialog open={openDetail} onOpenChange={onCloseDialog}>
                    <StudyGroupDetail
                        isTeacherManagement={isTeacherManagement}
                        closeDetailPopup={onCloseDialog}
                    />
                </Dialog>
            )}
        </>
    );
};

export default ScheduleCell;

const PriorityTag = () => {
    return (
        <div className="h-5 w-5 absolute -top-1 -right-1 rounded bg-yellow-100 border border-yellow-500 flex items-center justify-center text-yellow-600">
            <Star className="w-3 h-3" />
        </div>
    );
};
