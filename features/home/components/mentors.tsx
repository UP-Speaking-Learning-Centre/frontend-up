'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Teacher } from '@/types/teacher';

const Mentor = ({ mentor }: { mentor: Teacher }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(mentor.photoUrl);

    const handleImageError = () => {
        setImageUrl('/groups/5.svg');
    };
    return (
        <div
            key={mentor.memberName}
            className="bg-white relative rounded-xl flex flex-col overflow-hidden border-primary border-2"
        >
            <div className="relative aspect-[374/421] w-full overflow-hidden">
                <Image
                    src={imageUrl || '/levels/3.svg'}
                    alt={mentor.memberName}
                    onError={handleImageError}
                    fill
                />
            </div>
            <div className="p-3 grow flex flex-col">
                <div className="grow z-20">
                    <h3 className="text-lg font-bold text-gray-900">{mentor.memberName}</h3>
                    <p className="text-sm font-medium text-secondary">{mentor.speciality}</p>
                </div>
            </div>
        </div>
    );
};

export default Mentor;
