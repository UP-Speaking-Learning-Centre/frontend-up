'use client';
import { ProgramDetailTreeInterfaceItems } from '@/types/admin';
import { useState } from 'react';
import { useProgramDetailStore } from '../stores/program-detail';
import ProgramDetailCard from './program-detail-card';
import ProgramDetailTree from './program-detail-tree';

const ProgramDetailControl = ({
    id,
    isChild,
    item,
    section
}: {
    id: string;
    isChild?: boolean;
    item: ProgramDetailTreeInterfaceItems;
    section:string
}) => {
    const [open, setOpen] = useState(false);
    const id_ = useProgramDetailStore(s => s.id);
    return (
        <>
            <ProgramDetailCard
                title={item.title}
                isActive={id === id_}
                isOpen={open}
                isChild={isChild}
                onOpenCollapse={() => setOpen(!open)}
                item={item}
                section={section}
            />
            {!!item.children && open && (
                <ProgramDetailTree id={id.toString()} items={item.children} />
            )}
        </>
    );
};

export default ProgramDetailControl;
