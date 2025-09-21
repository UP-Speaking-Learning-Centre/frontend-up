'use client';
import { ProgramDetailTreeInterface } from '@/types/admin';
import { useState } from 'react';
import ProgramDetailCard from './program-detail-card';
import ProgramDetailTree from './program-detail-tree';

const ProgramDetailControl = ({
    children,
    isChild,
    title,
    description,
}: {
    children?: ProgramDetailTreeInterface;
    isChild?: boolean;
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ProgramDetailCard
                title={title}
                description={description}
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
