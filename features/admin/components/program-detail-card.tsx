'use client';

import { Button } from '@/components/ui/button';
import {
    ProgramDetail,
    ProgramDetailGrade,
    ProgramDetailGroup,
    ProgramDetailTreeInterfaceItems,
    ProgramRecurse,
} from '@/types/admin';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import ProgramDetailDrawerDetail from './program-detail-drawer-detail';

const ProgramDetailCard = ({
    isActive,
    isOpen,
    isChild,
    onOpenCollapse,
    item,
    section,
}: {
    title: string;
    isActive: boolean;
    isOpen: boolean;
    isChild?: boolean;
    onOpenCollapse?: () => void;
    item: ProgramDetailTreeInterfaceItems;
    section: string;
}) => {
    const { id, title, children } = item;
    const { setState } = useProgramDetailStore();

    const handleOpenDetail = () => {
        setState({
            id: id.toString(),
            isDrawerOpen: true,
            title: section + ' Detail',
            content: <ProgramDetailDrawerDetail title={title} props={item} />,
        });
    };

    const getDescription = (item: ProgramRecurse) => {
        return (
            (item as ProgramDetail).description ||
            (item as ProgramDetailGroup).materi ||
            (item as ProgramDetailGrade).prerequisites
        );
    };

    return (
        <div
            className={clsx(
                'bg-white rounded-lg p-4 border border-[#E2E8F0] mb-2.5 program-detail-card relative',
                isChild &&
                    'before:bg-primary before:block before:w-5 before:h-0.5 before:absolute before:top-1/2 before:-translate-y-1/2 before:right-full',
                isActive && '!bg-primary/20 border-primary'
            )}
            style={{ boxShadow: '0px 0px 20px 0px #00000014' }}
        >
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 truncate">
                    <h2 className="text-lg font-semibold text-[#020817] mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 truncate">
                        {getDescription(item as ProgramRecurse)}
                    </p>
                    {!!children && (
                        <div className="flex items-center justify-center">
                            <button
                                onClick={onOpenCollapse}
                                className="flex items-center gap-2 text-sm text-gray-600"
                            >
                                <span>Lihat Groups</span>
                                {isOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
                <Button
                    onClick={handleOpenDetail}
                    variant="outline"
                    size="sm"
                    className="border border-primary"
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
};

export default ProgramDetailCard;
