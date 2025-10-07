'use client';
import useProgramSelectionStore from '@/features/select-program/stores/program-selection-store';
import React, { Suspense } from 'react';
import { CHOOSE_PACKAGE_STEP, REGISTER_STEPS } from '@/constants/program-selections';
import PackageCards from '@/features/select-program/components/choose-package/package-cards';
import Title from '@/features/select-program/components/title';
import Price from '@/features/select-program/components/price';
import FormInformation from '@/features/select-program/components/form-information';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import usePlacementTestGuestStore from '@/features/select-program/stores/placemenet-test-guest-store';

const RegisterPage = () => {
    const searchParams = useSearchParams();
    const testSessionId = searchParams.get('testSessionId');
    const setTestSessionId = usePlacementTestGuestStore(s => s.setTestSessionId);

    useEffect(() => {
        if (testSessionId) {
            setTestSessionId(testSessionId);
        }
    }, [testSessionId]);

    return (
        <>
            <div
                id={CHOOSE_PACKAGE_STEP}
                className="min-h-[calc(100vh-64px)] py-24 flex flex-col justify-center"
            >
                <Title
                    title="Pilih Paket Anda"
                    description="Sebelum isi data diri, pilih paket yang paling sesuai dengan kebutuhan Anda. "
                />

                <PackageCards isFromPlacement={true} />
            </div>

            <Price isFromPlacement={true} />
            <FormInformation isFromPlacement={true} />
        </>
    );
};

const RegisterPageWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
        </Suspense>
    );
};

export default RegisterPageWrapper;
