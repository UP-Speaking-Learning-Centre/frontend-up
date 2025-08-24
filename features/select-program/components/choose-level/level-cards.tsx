import React from 'react';
import data from '@/data/dummy.json';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GROUP_STEP, CHOOSE_LEVEL_STEP } from '@/constants/program-selections';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const LevelCards = () => {
    const { handleNextStepAction, formValue } = useProgramSelection();
    const groups = data.programs.find(item => item.category === formValue.programCategory)?.groups;
    const levels = groups?.find(item => item.name === formValue.group)?.levels;

    const [open, setOpen] = React.useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {levels!.map(item => {
                const isLevelSelected = formValue.level === item.name;
                return (
                    <Card
                        title={item.name}
                        description={`${item.grades.length} grade tersedia`}
                        key={item.name}
                        imageUrl="/school-program.svg"
                        buttonLabel={isLevelSelected ? 'Selected' : 'Select'}
                        buttonAction={() =>
                            handleNextStepAction({
                                stepId: CHOOSE_LEVEL_STEP,
                                formValue: { level: item.name },
                            })
                        }
                        selected={isLevelSelected}
                    />
                );
            })}

            <Card
                title={'Belum tau levelmu?'}
                description={'Kamu belum tau apa levelmu?'}
                imageUrl="/school-program.svg"
                buttonLabel={'Select'}
                buttonAction={() => setOpen(true)}
                selected={false}
            />

            <Dialog open={open} onOpenChange={setOpen}>
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
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            className="flex-1 bg-[#CE6439] text-white"
                            onClick={() => setOpen(false)}
                        >
                            Mulai Test
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LevelCards;
