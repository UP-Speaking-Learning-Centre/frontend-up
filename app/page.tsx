import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const Pages = () => {
    return (
        <div className="grid  grid-cols-1 md:grid-cols-2 min-h-screen w-full">
            <div className="bg-primary flex flex-col col-span-1 order-2 md:order-1 justify-center items-center">
                <Image src="/logo-black.png" alt="Logo" width={200} height={200} />
            </div>
            <div className="col-span-1 order-1 md:order-2 flex flex-col text-center p-2 justify-center items-center">
                <h1 className="text-2xl font-bold">Website dalam proses pengembangan</h1>
                <p className="text-lg mt-2">Tunggu sebentar ya!</p>
            </div>
        </div>
    );
};

export default Pages;
