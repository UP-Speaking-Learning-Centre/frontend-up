'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Overlay from '@/components/layout/overlay';

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

    return (
        <>
            {isOverlayVisible && <Overlay />}

            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default LandingLayout;
