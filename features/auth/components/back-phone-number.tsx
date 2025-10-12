import { Button } from '@/components/ui/button';
import React from 'react';
import useAuthStore from '../stores/authStore';
import { NEW_ACCOUNT, PHONE } from '../constants/config';

const BackPhoneNumber = () => {
    const { setStep } = useAuthStore();
    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => {
                sessionStorage.removeItem(NEW_ACCOUNT);
                setStep(PHONE);
            }}
            className="w-full mt-6"
        >
            Gunakan Nomor WhatsApp yang Berbeda
        </Button>
    );
};

export default BackPhoneNumber;
