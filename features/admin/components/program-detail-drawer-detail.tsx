import React from 'react';

const ProgramDetailDrawerDetail = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <div className="p-6 space-y-6">
            <div className="w-full h-64 bg-blue-100 rounded-lg overflow-hidden">
                <img
                    src="/placeholder.svg"
                    alt="Happy school children in uniforms raising hands"
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Nama Program</h3>
                <h4 className="text-md font-bold text-gray-900">{title}</h4>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Deskripsi Program</h3>
                <p className="text-gray-900 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

export default ProgramDetailDrawerDetail;
