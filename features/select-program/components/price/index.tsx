import React from 'react';
import useProgramSelection from '../../hooks/use-program-selection';
import { PRICE_STEP } from '@/constants/program-selections';
import Title from '../title';
import { Button } from '@/components/ui/button';
import useRenderPrices from '../../hooks/use-render-prices';

const Price = ({ isFromPlacement = false }: { isFromPlacement?: boolean }) => {
    const { isStepDisplayed, handleNextStepAction } = useProgramSelection(isFromPlacement);
    const { cheapestPrice, expensivePrice } = useRenderPrices();

    if (!isStepDisplayed(PRICE_STEP)) {
        return null;
    }

    return (
        <div
            className="h-[calc(100vh-64px)] flex items-center flex-col justify-center"
            id={PRICE_STEP}
        >
            <Title
                title={'Harga terbaik!'}
                description="karena harga yang bisa anda dapatkan adalah"
            />

            <div className="mt-12">
                <p className="text-xl font-semibold">Mulai dari</p>
                <p className="text-xl md:text-3xl font-bold line-through">{expensivePrice}</p>
                <div className="flex items-center gap-2">
                    <p className="text-4xl md:text-4xl lg:text-6xl text-primary font-bold">
                        {cheapestPrice}
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
