import React, { useState } from 'react';
import { useProgramDetailStore } from '../stores/program-detail';
import useGetPrices from '../queries/useGetPrices';
import { useParams } from 'next/navigation';

const useEditPrice = () => {
    const setState = useProgramDetailStore(s => s.setState);

    const handleEdit = (id: number) => {
        setState({ isPriceModalOpen: true, packageId: id });
    };
    return { handleEdit };
};

export default useEditPrice;
