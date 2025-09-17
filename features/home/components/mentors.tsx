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
            className="bg-white relative rounded-xl flex flex-col overflow-hidden border-primary border group"
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
                    <h3 className="group-hover:text-xl transition-all text-lg font-bold  text-gray-900">
                        {mentor.name}
                    </h3>
                    <p className="text-sm font-medium  text-[#CE6439]">{mentor.role}</p>
                </div>
                <p className="mt-3 text-lg text-primary relative z-20 translate-y-0 transition-all text-center font-bold font-bebasNeue tracking-wider group-hover:translate-y-[200px]">
                    Hover me!
                </p>
                <p className="mt-3 text-sm text-black relative z-20 translate-y-[100px] transition-all group-hover:translate-y-0">
                    {mentor.bio}
                </p>
            </div>
            <div className="absolute z-10 bottom-0 left-0 right-0 group-hover:translate-y-0 h-[200px] translate-y-[100px] bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.2)_100%)]"></div>
        </div>
    );
};

export default Mentor;
