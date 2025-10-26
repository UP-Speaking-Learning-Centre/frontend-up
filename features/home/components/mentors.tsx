'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

const Mentor = ({
    mentor,
}: {
    mentor: { name: string; role: string; bio: string; imageUrl: string };
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(mentor.imageUrl);

    const handleImageError = () => {
        setImageUrl('/groups/5.svg');
    };
    return (
        <div
            key={mentor.name}
            className="bg-white relative rounded-xl flex flex-col overflow-hidden border-primary border"
        >
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    className="object-cover transition-all group-hover:scale-125"
                    src={imageUrl || '/levels/3.svg'}
                    alt={mentor.name}
                    onError={handleImageError}
                    fill
                />
            </div>
            <div className="p-3 grow flex flex-col">
                <div className="grow z-20">
                    <h3 className="text-lg font-bold  text-gray-900">{mentor.name}</h3>
                    <p className="text-sm font-medium  text-[#CE6439]">{mentor.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Mentor;
