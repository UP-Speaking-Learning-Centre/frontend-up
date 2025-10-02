'use client';
import { ProgramDetailTreeInterface } from '@/types/admin';
import { useState } from 'react';
import ProgramDetailCard from './program-detail-card';
import ProgramDetailTree from './program-detail-tree';
import { useProgramDetailStore } from '../stores/program-detail';

const ProgramDetailControl = ({
    id,
    children,
    isChild,
    title,
    description,
}: {
    id: string;
    children?: ProgramDetailTreeInterface;
    isChild?: boolean;
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);
    const id_ = useProgramDetailStore(s => s.id);
    return (
        <>
            <ProgramDetailCard
                id={id.toString()}
                title={title}
                description={description}
                isActive={id === id_}
                isOpen={open}
                isChild={isChild}
                hasChild={!!children}
                onOpenCollapse={() => setOpen(!open)}
            />
            {!!children && open && <ProgramDetailTree id={id.toString()} items={children} />}
        </>
    );
};

export default ProgramDetailControl;
