import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import type { StaticImageData } from 'next/image';

type ImageWithFallbackProps = Omit<ImageProps, 'src'> & {
    src: string | StaticImageData;
    fallbackSrc?: string;
};

const ImageWithFallback = ({
    src,
    alt,
    fallbackSrc = '/person.svg',
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);

    return (
        <Image
            {...props}
            src={imgSrc === '' ? fallbackSrc : imgSrc}
            alt={alt}
            onError={() => setImgSrc(fallbackSrc)}
            unoptimized
        />
    );
};

export default ImageWithFallback;
