import { capitalizeFirstLetter } from '@/features/auth/utils/string.helper';
import { ProgramDetailTreeInterfaceItems } from '@/types/admin';
import React from 'react';
import { EXCLUDE_ITEMS } from '../constants/config';

const ProgramDetailDrawerDetail = ({
    title,
    props,
}: {
    title: string;
    props: ProgramDetailTreeInterfaceItems;
}) => {
    const filter = Object.keys(props).filter(item => !EXCLUDE_ITEMS.includes(item));

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
                <h3 className="text-xs font-medium text-gray-500 mb-2">
                    Judul
                </h3>
                <h4 className="text-gray-900 font-bold">{capitalizeFirstLetter(title)}</h4>
            </div>
            {filter.map(item => (
                <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">
                        {capitalizeFirstLetter(item)}
                    </h3>
                    <p className="text-gray-900 leading-relaxed">
                        {capitalizeFirstLetter(
                            String(props[item as keyof ProgramDetailTreeInterfaceItems] ?? '')
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProgramDetailDrawerDetail;
