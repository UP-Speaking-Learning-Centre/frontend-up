'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const MentorImage = ({
    mentor,
}: {
    mentor: { name: string; role: string; bio: string; imageUrl: string };
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(mentor.imageUrl);

    const handleImageError = () => {
        setImageUrl('/groups/5.svg');
    };
    return (
        <div className="relative h-48 overflow-hidden">
            <Image
                className="object-cover transition-all group-hover:scale-125"
                src={imageUrl || '/levels/3.svg'}
                alt={mentor.name}
                onError={handleImageError}
                fill
            />
        </div>
    );
};

export default MentorImage;
