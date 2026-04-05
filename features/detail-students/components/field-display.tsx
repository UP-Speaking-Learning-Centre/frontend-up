import { cn } from '@/lib/utils';
import React from 'react';

export const FieldDisplay = ({
    label,
    value,
    highlight = false,
    isDiv = false,
}: {
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
    isDiv?: boolean;
}) => (
    <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <div
            className={cn(
                'font-semibold',
                highlight ? 'text-primary' : 'text-gray-900',
                isDiv ? 'p-2 bg-gray-100 rounded' : ''
            )}
        >
            {value || <span className="text-neutral-400 font-normal">Belum ditentukan</span>}
        </div>
    </div>
);
