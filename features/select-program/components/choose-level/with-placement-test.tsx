import React, { useState } from 'react';
import Card from '../card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const WithPlacementTest = ({ display }: { display: boolean }) => {
    const [openDialogPlacement, setOpenDialogPlacement] = useState(false);

    return (
        <>
            {display && (
                <Card
                    className="basis-[calc(25%-18px)]"
                    title="Belum tau levelmu?"
                    description="Cari tahu levelmu dengan Placement Test!"
                    imageUrl="/school-program.svg"
                    buttonLabel="Pilih"
                    buttonAction={() => setOpenDialogPlacement(true)}
                    selected={false}
                />
            )}

            <Dialog open={openDialogPlacement} onOpenChange={setOpenDialogPlacement}>
                <DialogContent className="w-11/12" onInteractOutside={e => e.preventDefault()}>
                    <DialogTitle className="sr-only"></DialogTitle>
                    <div>
                        <p className="text-[#020817] font-semibold text-lg">Placement Test</p>
                        <p className="text-[#64748B] text-sm mt-1">
                            Kami akan melakukan tes penempatan untuk menentukan level yang tepat
                            untuk Anda. Tes ini terdiri dari 20 soal pilihan ganda dan membutuhkan
                            waktu sekitar 10 menit.
                        </p>
                        <div className="bg-[#EFF6FF] rounded-md p-4 mt-6">
                            <p className="text-[#1E3A8A] font-semibold">Yang akan Anda kerjakan:</p>
                            <div className="flex flex-col gap-2 pl-2 text-[#1E40AF] text-sm mt-2">
                                <p className="flex gap-2 items-center">
                                    <CheckCircle className="text-[#1E40AF] size-5" />
                                    20 soal pilihan ganda
                                </p>
                                <p className="flex gap-2 items-center">
                                    <CheckCircle className="text-[#1E40AF] size-5" />
                                    Waktu pengerjaan: 10 menit
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
                            onClick={() => setOpenDialogPlacement(false)}
                        >
                            Mulai Test
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WithPlacementTest;
