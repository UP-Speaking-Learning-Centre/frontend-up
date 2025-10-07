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
import SuccessDialog from './success-dialog';
import Overlay from '@/components/layout/overlay';
import ErrorDialog from './error-dialog';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSubmitRegistration from '../../hooks/use-submit-registration';
import { Form, FormField, FormItem } from '@/components/ui/form';

const FormInformation = ({ isFromPlacement = false }: { isFromPlacement?: boolean }) => {
    const { isStepDisplayed } = useProgramSelection(isFromPlacement);
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { submitRegistration, schema, isLoading, status, setStatus } =
        useSubmitRegistration(isFromPlacement);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: formValue.personalInformation.name,
            phone: formValue.personalInformation.phone,
            instagram: formValue.personalInformation.instagram,
        },
    });

    const {
        handleSubmit,
        formState: { errors, isValid },
    } = form;

    const getTitle = () => {
        if (isFromPlacement) {
            return 'Formulir Pendaftaran';
        }
        return 'Amankan Promo!';
    };

    const getDescription = () => {
        if (isFromPlacement) {
            return 'Silahkan isi data diri anda';
        }
        return 'Silahkan isi formulir supaya anda mendapatkan antrian teratas untuk mendapatkan promo';
    };

    if (!isStepDisplayed(FILL_PERSONAL_INFORMATION_STEP)) {
        return null;
    }

    return (
        <>
            <Overlay opacity={30} show={isLoading} />

            <div
                id={FILL_PERSONAL_INFORMATION_STEP}
                className="h-[calc(100vh-64px)] flex flex-col justify-center"
            >
                <Title title={getTitle()} description={getDescription()} />

                <Card className="w-full md:w-[500px] mx-auto mt-8 p-6">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(submitRegistration)}>
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <Label>Nama Student*</Label>
                                            <Input className="mt-1" {...field} />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="mt-6">
                                            <Label>No HP (WhatsApp)*</Label>
                                            <Input className="mt-1" {...field} />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                name="instagram"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="mt-6">
                                            <Label>Username Instagram (Opsional)</Label>
                                            <Input className="mt-1" {...field} />
                                        </FormItem>
                                    );
                                }}
                            />

                            <div className="mt-12">
                                <Button
                                    className="w-full"
                                    type="submit"
                                    disabled={isLoading || !isValid}
                                >
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>

            <ErrorDialog
                open={status.open && status.status === 'error'}
                onOpenChange={() => setStatus({ status: '', open: false })}
            />
            <SuccessDialog
                open={status.open && status.status === 'success'}
                onOpenChange={() => setStatus({ status: '', open: false })}
                isFromPlacement={isFromPlacement}
            />
        </>
    );
};

export default FormInformation;
