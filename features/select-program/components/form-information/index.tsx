'use client';

import React from 'react';
import { FILL_PERSONAL_INFORMATION_STEP } from '@/constants/program-selections';
import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useProgramSelectionStore from '../../stores/program-selection-store';
import useSubmitRegistrationMutation from '../../queries/use-submit-registration';

const FormInformation = () => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection();
    const formValue = useProgramSelectionStore(s => s.formValue);
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const { mutate } = useSubmitRegistrationMutation();

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
                {/* <form> */}
                <div>
                    <Label>Nama Student</Label>
                    <Input
                        className="mt-1"
                        value={formValue.personalInformation.name}
                        onChange={e =>
                            setFormValue({
                                personalInformation: {
                                    ...formValue.personalInformation,
                                    name: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="mt-6">
                    <Label>No HP (WhatsApp)</Label>
                    <Input
                        className="mt-1"
                        value={formValue.personalInformation.phone}
                        onChange={e =>
                            setFormValue({
                                personalInformation: {
                                    ...formValue.personalInformation,
                                    phone: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="mt-6">
                    <Label>Username Instagram (Opsional)</Label>
                    <Input
                        className="mt-1"
                        value={formValue.personalInformation.instagram}
                        onChange={e =>
                            setFormValue({
                                personalInformation: {
                                    ...formValue.personalInformation,
                                    instagram: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="mt-12">
                    <Button
                        className="w-full"
                        onClick={() => {
                            mutate();
                        }}
                    >
                        Simpan
                    </Button>
                </div>
                {/* </form> */}
            </Card>
        </div>
    );
};

export default FormInformation;
