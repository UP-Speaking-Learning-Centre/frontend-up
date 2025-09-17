import React from 'react';
import useProgramSelection from '../../hooks/use-program-selection';
import useProgramSelectionStore from '../../stores/program-selection-store';
import {
    PRICE_STEP,
    PROGRAM_SELECTION_STEPS,
    REGISTER_STEPS,
} from '@/constants/program-selections';
import useFetchPackagesQuery from '../../queries/use-fetch-packages';
import SectionTitle from '@/components/section-title';
import Title from '../title';
import { Button } from '@/components/ui/button';

const Price = ({ steps }: { steps?: typeof PROGRAM_SELECTION_STEPS | typeof REGISTER_STEPS }) => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection(steps);
    const { data: packages } = useFetchPackagesQuery();
    const { packageId, programId } = useProgramSelectionStore(s => s.formValue);

    if (!isStepDisplayed(PRICE_STEP)) {
        return null;
    }

    const selectedPrice = () => {
        const price = packages
            ?.find(p => p.id === packageId)
            ?.prices.find(p => p.program === programId)?.price;

        const sortedPrice = price?.map(p => p.price / p.duration).sort((a, b) => a - b);
        const cheapestPrice = sortedPrice?.[0];
        const expensivePrice = sortedPrice?.[sortedPrice.length - 1];

        const formattedPrice = (price: number) =>
            new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(Math.round(price || 0));

        return {
            cheapestPrice: formattedPrice(cheapestPrice || 0),
            expensivePrice: formattedPrice(expensivePrice || 0),
        };
    };

    return (
        <div
            className="h-[calc(100vh-64px)] flex items-center flex-col justify-center"
            id={PRICE_STEP}
        >
            <Title
                title={'Daftar sekarang!'}
                description="karena harga yang bisa anda dapatkan adalah"
            />

            <div className="mt-12">
                <p className="text-xl font-semibold">Mulai dari</p>
                <p className="text-xl md:text-3xl font-bold line-through">
                    {selectedPrice().expensivePrice}
                </p>
                <div className="flex items-center gap-2">
                    <p className="text-4xl md:text-4xl lg:text-6xl text-primary font-bold">
                        {selectedPrice().cheapestPrice}
                    </p>
                    <p className="text-xl">/bulan</p>
                </div>

                <div className="mt-10 text-xs italic">
                    *Chat ke Admin UP untuk mendapatkan promo
                </div>
            </div>

            <div className="mt-12">
                <Button onClick={() => handleNextStepAction({ stepId: PRICE_STEP, formValue: {} })}>
                    Lanjutkan
                </Button>
            </div>
        </div>
    );
};

export default Price;
