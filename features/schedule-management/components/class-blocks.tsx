'use client';

import { useState } from 'react';
import { ScheduleItem } from '@/types/schedule';
import { getPackageColor } from '@/lib/schedule';
import { Star } from 'lucide-react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { Dialog } from '@/components/ui/dialog';
import StudyGroupDetail from './studygroup-detail';

interface ClassBlockProps {
    classItem: ScheduleItem;
    topOffset: number;
    height: number;
}

export function ClassBlock({ classItem, topOffset, height }: ClassBlockProps) {
    const [isHovering, setIsHovering] = useState(false);
    const color = getPackageColor(classItem.package);

    const [openDetail, setOpenDetail] = useState(false);
    const setStudyGroupId = useScheduleManagementStore(s => s.setStudyGroupId);

    const studyGroupId = classItem?.studyGroupId || 0;
    const onCloseDialog = () => {
        setOpenDetail(false);
        setStudyGroupId(0);
    };

    const onClickCell = () => {
        setOpenDetail(true);
        setStudyGroupId(studyGroupId);
    };

    return (
        <>
            <div
                className="absolute left-0 box-border right-0 outline outline-1 outline-neutral-700 cursor-pointer transition-all duration-200"
                onClick={onClickCell}
                style={{
                    top: `${topOffset}px`,
                    height: `${height}px`,
                    minHeight: '40px',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div
                    className={`${color} relative h-full p-2 text-xs font-medium flex flex-col justify-between transition-all duration-200`}
                >
                    <div>
                        <p className="font-semibold text-sm line-clamp-2">
                            {classItem.studyGroup || 'No Group'}
                        </p>
                        <p className="text-xs opacity-90">Students: {classItem.totalStudent}</p>
                    </div>
                    <div
                        className={`text-xs transition-opacity duration-200 ${
                            isHovering ? 'opacity-100' : 'opacity-75'
                        }`}
                    >
                        <p>{`${classItem.startTime.slice(0, 5)} - ${classItem.endTime.slice(
                            0,
                            5
                        )}`}</p>
                        {classItem.location && <p className="line-clamp-1">{classItem.location}</p>}

                        {classItem.isPriority && <PriorityTag />}
                    </div>
                </div>
            </div>
            {openDetail && (
                <Dialog open={openDetail} onOpenChange={onCloseDialog}>
                    <StudyGroupDetail
                        isTeacherManagement={false}
                        closeDetailPopup={onCloseDialog}
                    />
                </Dialog>
            )}
        </>
    );
}

const PriorityTag = () => {
    return (
        <div className="h-5 w-5 absolute top-1 right-1 rounded bg-yellow-100 border border-yellow-500 flex items-center justify-center text-yellow-600">
            <Star className="w-3 h-3" />
        </div>
    );
};
