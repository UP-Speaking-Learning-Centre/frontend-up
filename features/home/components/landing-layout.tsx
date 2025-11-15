'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Overlay from '@/components/layout/overlay';
import Image from 'next/image';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOverlayVisible, setIsOverlayVisible] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsOverlayVisible(false);
        }, 2000);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const onClickWA = () => {
        window.open(
            'https://wa.me/+6281316701747?text=Halo%2C%20saya%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20di%20UP%20Speaking%20Learning%20Centre',
            '_blank'
        );
    };

    return (
        <>
            {isOverlayVisible && <Overlay />}

            <div
                onClick={onClickWA}
                className="bg-white rounded-2xl shadow-xl border-2 cursor-pointer hover:scale-105 transition-all duration-300 border-secondary size-16 flex items-center justify-center fixed right-4 bottom-20 z-50"
            >
                <div className="relative size-16">
                    <Image src={'/wa.webp'} fill alt="Logo UP" />
                </div>
            </div>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default LandingLayout;
