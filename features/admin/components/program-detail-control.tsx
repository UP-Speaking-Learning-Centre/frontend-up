'use client';
import { ProgramDetailTreeInterface } from '@/types/program-detail';
import { useState } from 'react';
import ProgramDetailCard from './program-detail-card';
import ProgramDetailTree from './program-detail-tree';

const ProgramDetailControl = ({
    children,
    isChild,
}: {
    children?: ProgramDetailTreeInterface;
    isChild?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ProgramDetailCard
                isActive={open}
                isOpen={open}
                isChild={isChild}
                hasChild={!!children}
                onOpenCollapse={() => setOpen(!open)}
            />
            {!!children && open && <ProgramDetailTree items={children} />}
        </>
    );
};

export default ProgramDetailControl;
