'use client';

import React, { useState } from 'react';
import Card from '../card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import usePlacementTestGuestStore from '../../stores/placemenet-test-guest-store';
import useFetchPlacementTestMutation from '../../queries/use-fetch-placement-test';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import {
    FORM_VALUE_KEY,
    QUESTION_KEY,
    STORAGE_KEY,
} from '@/features/placement-test/hooks/use-placement-test';
import useProgramSelectionStore from '../../stores/program-selection-store';

const WithPlacementTest = ({ display }: { display: boolean }) => {
    const [openDialogPlacement, setOpenDialogPlacement] = useState(false);
    const { isPending } = useFetchPlacementTestMutation();
    const router = useRouter();
    const formValue = useProgramSelectionStore(s => s.formValue);
    const questions = usePlacementTestGuestStore(s => s.questions);
    const testSessionId = usePlacementTestGuestStore(s => s.testSessionId);

    return (
        <>
            {display && (
                <Card
                    className="sm:basis-[calc(50%-18px)] xl:basis-[calc(25%-18px)]"
                    title="Belum tau levelmu?"
                    description="Cari tahu levelmu dengan Placement Test!"
                    imageUrl="/levels/10.svg"
                    buttonLabel="Pilih"
                    buttonAction={() => setOpenDialogPlacement(true)}
                    selected={false}
                />
            )}

            <Dialog open={openDialogPlacement} onOpenChange={setOpenDialogPlacement}>
                <DialogContent className="w-11/12" onInteractOutside={e => e.preventDefault()}>
                    <DialogTitle className="sr-only"></DialogTitle>
                    {isPending ? (
                        <>
                            <Skeleton className="w-full h-20"></Skeleton>
                            <Skeleton className="w-full h-20"></Skeleton>
                            <Skeleton className="w-full h-10"></Skeleton>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-[#020817] font-semibold text-lg">
                                    Placement Test
                                </p>
                                <p className="text-[#64748B] text-sm mt-1">
                                    Kami akan melakukan tes penempatan untuk menentukan level yang
                                    tepat untuk Anda.
                                </p>
                                <div className="bg-[#EFF6FF] rounded-md p-4 mt-6">
                                    <p className="text-[#1E3A8A] font-semibold">
                                        Yang akan Anda kerjakan:
                                    </p>
                                    <div className="flex flex-col gap-2 pl-2 text-[#1E40AF] text-sm mt-2">
                                        <p className="flex gap-2 items-center">
                                            <CheckCircle className="text-[#1E40AF] size-5" />
                                            {questions.length} soal pilihan ganda dan isian.
                                        </p>
                                        <p className="flex gap-2 items-center">
                                            <CheckCircle className="text-[#1E40AF] size-5" />
                                            Waktu pengerjaan: 20 menit
                                        </p>
                                        <p className="flex gap-2 items-center">
                                            <CheckCircle className="text-[#1E40AF] size-5" />
                                            Materi: Grammar, Vocabulary, Reading
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button
                                    className="flex-1 bg-white border-2 border-[#E2E8F0] text-[#111827]"
                                    onClick={() => setOpenDialogPlacement(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    className="flex-1 bg-[#CE6439] text-white"
                                    onClick={() => {
                                        setOpenDialogPlacement(false);
                                        localStorage.removeItem(STORAGE_KEY);
                                        localStorage.removeItem(QUESTION_KEY);
                                        localStorage.setItem(
                                            FORM_VALUE_KEY,
                                            JSON.stringify(formValue)
                                        );
                                        router.push(
                                            `${ROUTES.placementTest}?testSessionId=${testSessionId}`
                                        );
                                    }}
                                >
                                    Mulai Test
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WithPlacementTest;
