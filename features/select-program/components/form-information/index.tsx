'use client';

import React, { useState } from 'react';
import { FILL_PERSONAL_INFORMATION_STEP } from '@/constants/program-selections';
import useProgramSelection from '../../hooks/use-program-selection';
import Title from '../title';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useProgramSelectionStore from '../../stores/program-selection-store';
import useSubmitRegistrationMutation from '../../queries/use-submit-registration';
import { PROGRAM_SELECTION_STEPS, REGISTER_STEPS } from '@/constants/program-selections';
import useRegisterFromPlacementMutation from '../../queries/use-submit-registration-from-placement';
import { Dialog } from '@/components/ui/dialog';
import SuccessDialog from './success-dialog';
import usePlacementTestGuestStore from '../../stores/placemenet-test-guest-store';
import Overlay from '@/components/layout/overlay';
import ErrorDialog from './error-dialog';

const FormInformation = ({
    steps,
}: {
    steps?: typeof PROGRAM_SELECTION_STEPS | typeof REGISTER_STEPS;
}) => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection(steps);
    const formValue = useProgramSelectionStore(s => s.formValue);
    const setStudentInfo = useProgramSelectionStore(s => s.setStudentInfo);
    const testSessionId = usePlacementTestGuestStore(s => s.testSessionId);
    const { mutate, isPending: isPendingFromProgram } = useSubmitRegistrationMutation();
    const { mutate: mutateRegisterFromPlacement, isPending: isPendingFromPlacement } =
        useRegisterFromPlacementMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    if (!isStepDisplayed(FILL_PERSONAL_INFORMATION_STEP)) {
        return null;
    }

    const onSuccess = () => {
        setIsSuccess(true);
    };

    const onError = () => {
        setIsError(true);
    };

    const handleSave = () => {
        if (steps === REGISTER_STEPS) {
            mutateRegisterFromPlacement(
                {},
                {
                    onSuccess,
                    onError,
                }
            );
        } else {
            mutate(
                {},
                {
                    onSuccess,
                    onError,
                }
            );
        }
    };

    const isPhoneNumberValid = (phone: string) => {
        const phoneRegex = /^08[1-9][0-9]{6,9}$/;
        return phoneRegex.test(phone);
    };

    const getTitle = () => {
        if (steps === REGISTER_STEPS) {
            return 'Formulir Pendaftaran';
        }
        return 'Amankan Promo!';
    };

    const getDescription = () => {
        if (steps === REGISTER_STEPS) {
            return 'Silahkan isi data diri anda';
        }
        return 'Silahkan isi formulir supaya anda mendapatkan antrian teratas untuk mendapatkan promo';
    };

    return (
        <>
            <Overlay opacity={30} show={isPendingFromProgram || isPendingFromPlacement} />

            <div
                id={FILL_PERSONAL_INFORMATION_STEP}
                className="h-[calc(100vh-64px)] flex flex-col justify-center"
            >
                <Title title={getTitle()} description={getDescription()} />

                <Card className="w-full md:w-[500px] mx-auto mt-8 p-6">
                    {/* <form> */}
                    <div>
                        <Label>Nama Student*</Label>
                        <Input
                            className="mt-1"
                            value={formValue.personalInformation.name}
                            onChange={e =>
                                setStudentInfo({
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mt-6">
                        <Label>No HP (WhatsApp)*</Label>
                        <Input
                            className="mt-1"
                            value={formValue.personalInformation.phone}
                            onChange={e =>
                                setStudentInfo({
                                    phone: e.target.value,
                                })
                            }
                        />
                        {formValue.personalInformation.phone &&
                            !isPhoneNumberValid(formValue.personalInformation.phone) && (
                                <p className="text-red-500 mt-1">
                                    Format No HP tidak valid (Gunakan format 08xxxxxx)
                                </p>
                            )}
                    </div>

                    <div className="mt-6">
                        <Label>Username Instagram (Opsional)</Label>
                        <Input
                            className="mt-1"
                            value={formValue.personalInformation.instagram}
                            onChange={e =>
                                setStudentInfo({
                                    instagram: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mt-12">
                        <Button
                            className="w-full"
                            disabled={
                                isPendingFromProgram ||
                                isPendingFromPlacement ||
                                !formValue.personalInformation.name ||
                                !formValue.personalInformation.phone ||
                                !isPhoneNumberValid(formValue.personalInformation.phone)
                            }
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            Simpan
                        </Button>
                    </div>
                    {/* </form> */}
                </Card>
            </div>

            <ErrorDialog open={isError} onOpenChange={setIsError} />
            <SuccessDialog
                open={isSuccess}
                onOpenChange={setIsSuccess}
                isFromPlacement={steps === REGISTER_STEPS}
            />
        </>
    );
};

export default FormInformation;
