'use client';
import { X } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import clsx from 'clsx';

const ProgramDetailDrawer = () => {
    const setState = useProgramDetailStore(s => s.setState);
    const isDrawerOpen = useProgramDetailStore(s => s.isDrawerOpen);

    return (
        <div
            className={clsx(
                'fixed bg-white w-[400px] min-h-[100vh] shadow-lg right-0 top-0 transition-all',
                !isDrawerOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-[9.5px] px-4 border-b">
                <h2 className="text-md font-bold text-gray-900">Program Detail</h2>
                <button
                    onClick={() => setState({ isDrawerOpen: false })}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
                {/* Program Image */}
                <div className="w-full h-64 bg-blue-100 rounded-lg overflow-hidden">
                    <img
                        src="/placeholder.svg"
                        alt="Happy school children in uniforms raising hands"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Program Name Section */}
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Nama Program</h3>
                    <h4 className="text-md font-bold text-gray-900">School Program</h4>
                </div>

                {/* Program Description Section */}
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Deskripsi Program</h3>
                    <p className="text-gray-900 leading-relaxed">
                        Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus
                        lebih pede tampil di kelas maupun lomba.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetailDrawer;
