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

    const renderText = (text: string) => {
        if (!text) return '';

        if (text.includes('\n'))
            return text.split('\n').map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                    <p className="font-medium text-gray-500">{idx + 1}.</p>
                    <p>{item}</p>
                </div>
            ));

        return text;
    };

    return (
        <div className="p-4 space-y-6">
            <div className="w-full h-64 bg-blue-100 rounded-lg overflow-hidden">
                <img
                    src="/placeholder.svg"
                    alt="Happy school children in uniforms raising hands"
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">Nama {props.detailTitle}</h3>
                <h4 className="text-gray-900 font-bold">{capitalizeFirstLetter(title)}</h4>
            </div>
            {filter.map((item, idx) => (
                <div key={idx}>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">
                        {capitalizeFirstLetter(item)}
                    </h3>
                    <div className="text-gray-900 text-sm leading-normal">
                        {renderText(
                            String(props[item as keyof ProgramDetailTreeInterfaceItems]) ?? ''
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgramDetailDrawerDetail;
