import React from 'react';
import { FILL_PERSONAL_INFORMATION_STEP } from '@/constants/program-selections';
import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FormInformation = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();

    if (!isStepDisplayed(FILL_PERSONAL_INFORMATION_STEP)) {
        return null;
    }

    return (
        <div
            id={FILL_PERSONAL_INFORMATION_STEP}
            className="h-[calc(100vh-64px)] flex flex-col justify-center"
        >
            <Title
                title="Amankan Promo!"
                description="Silahkan isi formulir supaya anda mendapatkan antrian teratas untuk mendapatkan promo"
            />
            <Card className="w-full md:w-[500px] mx-auto mt-8 p-6">
                <form>
                    <div>
                        <Label>Nama Student</Label>
                        <Input className="mt-1" />
                    </div>

                    <div className="mt-6">
                        <Label>No HP (WhatsApp)</Label>
                        <Input className="mt-1" />
                    </div>

                    <div className="mt-6">
                        <Label>Username Instagram (Opsional)</Label>
                        <Input className="mt-1" />
                    </div>

                    <div className="mt-12">
                        <Button className="w-full">Simpan</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default FormInformation;
