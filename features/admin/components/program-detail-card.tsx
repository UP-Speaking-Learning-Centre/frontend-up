'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import ProgramDetailDrawerDetail from './program-detail-drawer-detail';

const ProgramDetailCard = ({
    isActive,
    isOpen,
    isChild,
    hasChild,
    onOpenCollapse,
    title,
    description,
}: {
    title: string;
    description: string;
    isActive: boolean;
    isOpen: boolean;
    isChild?: boolean;
    hasChild?: boolean;
    onOpenCollapse?: () => void;
}) => {
    const { setState } = useProgramDetailStore();

    const handleOpenDetail = () => {
        setState({
            isDrawerOpen: true,
            title: 'Program Detail',
            content: <ProgramDetailDrawerDetail title={title} desc={description} />,
        });
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
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-[#020817] mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
                    {hasChild && (
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
                    className="text-primary border-2 border-primary hover:bg-orange-50 bg-transparent bg-white"
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
};

export default ProgramDetailCard;
