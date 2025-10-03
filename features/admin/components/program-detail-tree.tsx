'use client';

import { ProgramDetailTreeInterface } from '@/types/admin';
import ProgramDetailControl from './program-detail-control';

const ProgramDetailTree = ({ items, id }: { items: ProgramDetailTreeInterface; id: string }) => {
    return (
        <div className="ml-20 border-l-4 pl-4 rounded-lg border-primary py-2 mb-2.5">
            {/* Groups Header */}
            <div className="bg-secondary text-white rounded-lg px-4 py-3 mb-4">
                <h3 className="font-semibold">{items.title}</h3>
            </div>

            {/* First Kindergarten with expanded Levels */}
            <div className="relative">
                {items.items.map((item, idx) => (
                    <ProgramDetailControl
                        id={`${id}-${idx}`}
                        title={item.title}
                        description={item.description}
                        children={item.children}
                        isChild
                    />
                ))}
            </div>
        </div>
    );
};

export default ProgramDetailTree;
