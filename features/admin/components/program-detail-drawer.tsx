'use client';
import { X } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import clsx from 'clsx';

const ProgramDetailDrawer = () => {
    const setState = useProgramDetailStore(s => s.setState);
    const isDrawerOpen = useProgramDetailStore(s => s.isDrawerOpen);
    const content = useProgramDetailStore(s => s.content);
    const title = useProgramDetailStore(s => s.title);

    return (
        <div
            className={clsx(
                'block fixed bg-white w-[400px] h-[100vh] shadow-lg right-0 top-0 transition-all p-4 overflow-auto',
                !isDrawerOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            <div className="flex items-center justify-between p-[9.5px] px-4 border-b">
                <h2 className="text-md font-bold text-gray-900">{title}</h2>
                <button
                    onClick={() => setState({ isDrawerOpen: false })}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {content}
        </div>
    );
};

export default ProgramDetailDrawer;
