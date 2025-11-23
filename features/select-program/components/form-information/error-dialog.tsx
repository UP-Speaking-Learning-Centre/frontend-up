'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const ErrorDialog = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const router = useRouter();

    const getTitle = () => {
        return 'Terjadi Kesalahan';
    };

    const getSubTitle = () => {
        return 'Terjadi kesalahan. silahkan coba lagi nanti atau hubungi Admin UP <b>(081316701747)</b> untuk informasi lebih lanjut';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-11/12" onInteractOutside={e => e.preventDefault()}>
                <DialogTitle className="sr-only"></DialogTitle>

                <>
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <X className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-center">
                        <p className="text-[#020817] font-semibold text-lg">{getTitle()}</p>
                        <p
                            className="text-[#64748B] text-sm mt-1"
                            dangerouslySetInnerHTML={{ __html: getSubTitle() }}
                        ></p>
                    </div>
                    <div className="flex gap-2 justify-center w-full">
                        <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => {
                                onOpenChange(false);
                                router.push(ROUTES.home);
                            }}
                        >
                            Kembali ke Beranda
                        </Button>
                        <Button
                            className="flex-1 bg-primary text-white w-fit"
                            onClick={() => {
                                onOpenChange(false);
                            }}
                        >
                            Periksa Kembali
                        </Button>
                    </div>
                </>
            </DialogContent>
        </Dialog>
    );
};

export default ErrorDialog;
