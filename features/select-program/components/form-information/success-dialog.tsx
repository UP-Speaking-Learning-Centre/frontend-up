'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const SuccessDialog = ({
    open,
    isFromPlacement = false,
    onOpenChange,
}: {
    open: boolean;
    isFromPlacement?: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const router = useRouter();

    const getTitle = () => {
        if (isFromPlacement) {
            return ' Pengisian Data Diri Berhasil!';
        }
        return 'Pendaftaran program berhasil!';
    };

    const getSubTitle = () => {
        if (isFromPlacement) {
            return 'Tim UP SLC akan menghubungi anda secepatnya!';
        }
        return 'Tim UP SLC akan menghubungi anda secepatnya jika terdapat perubahan.';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-11/12" onInteractOutside={e => e.preventDefault()}>
                <DialogTitle className="sr-only"></DialogTitle>

                <>
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-center">
                        <p className="text-[#020817] font-semibold text-lg">{getTitle()}</p>
                        <p className="text-[#64748B] text-sm mt-1">{getSubTitle()}</p>
                    </div>
                    <div className="flex gap-2 justify-center w-full">
                        <Button
                            className="flex-1 bg-[#CE6439] text-white w-fit"
                            onClick={() => {
                                onOpenChange(false);
                                router.push(ROUTES.home);
                            }}
                        >
                            Okay
                        </Button>
                    </div>
                </>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessDialog;
