'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ProgramSelectionComponent from '@/features/select-program/components/program-selection-component';

export default function SelectProgramPage() {
    const router = useRouter();
    const [level, setLevel] = useState('');
    const [showPlacementDialog, setShowPlacementDialog] = useState(false);

    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Saya tidak tahu level saya'];

    return (
        <>
            <div className="relative isolate overflow-hidden bg-[#254116] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Pilih Programmu Yuk!
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Customize your learning experience by selecting the options that best
                            fit your needs and goals.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-12 pb-48">
                <ProgramSelectionComponent />
            </div>

            <Dialog open={showPlacementDialog} onOpenChange={setShowPlacementDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Placement Test</DialogTitle>
                        <DialogDescription>
                            Kami akan melakukan tes penempatan untuk menentukan level yang tepat
                            untuk Anda. Tes ini terdiri dari 20 soal pilihan ganda dan membutuhkan
                            waktu sekitar 15-20 menit.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">
                                Yang akan Anda kerjakan:
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• 20 soal pilihan ganda</li>
                                <li>• Waktu pengerjaan: 20 menit</li>
                                <li>• Materi: Grammar, Vocabulary, Reading</li>
                                <li>• Hasil langsung tersedia</li>
                            </ul>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowPlacementDialog(false)}
                                className="flex-1"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowPlacementDialog(false);
                                    router.push('/placement-test');
                                }}
                                className="flex-1"
                            >
                                Mulai Test
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
