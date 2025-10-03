import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { Price, RequestPrice } from '@/types/admin';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

const usePatchPrice = () => {
    const patchNoteByUserId = async (data: RequestPrice) => {
        const res = await api.patch<Price>(ENDPOINTS.patchpricesByProgram, data);
        return res.data;
    };
    const { mutateAsync } = useMutation({
        mutationFn: patchNoteByUserId,
    });

    return { mutateAsync };
};

export default usePatchPrice;
