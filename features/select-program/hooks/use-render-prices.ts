import { useMemo } from 'react';
import useProgramSelectionStore from '../stores/program-selection-store';

const MAX_PROMO = 300000;
const MIN_MONTH_TO_HAVE_PROMO = 6;
const useRenderPrices = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);

    const programPrice = useMemo(() => {
        if (!!formValue.programPrices.length && !!formValue.packageId) {
            const prices = formValue.programPrices
                .filter(price => price.package.id === formValue.packageId)
                .map(price => {
                    return {
                        price: price.amount,
                        timeframe: Number(price.timeframe.charAt(0)),
                    };
                });
            const sortedPrices = prices.sort((a, b) => a.timeframe - b.timeframe);
            const pricesAfterPromo = sortedPrices.map((p, index) => {
                if (index === sortedPrices.length - 1) {
                    return {
                        ...p,
                        price: p.price - (p.timeframe >= MIN_MONTH_TO_HAVE_PROMO ? MAX_PROMO : 0),
                    };
                }
                return p;
            });

            return pricesAfterPromo;
        }
    }, [formValue.programPrices, formValue.packageId]);

    const sortedPrice = useMemo(
        () => programPrice?.map(p => p.price / p.timeframe).sort((a, b) => a - b),
        [programPrice]
    );

    const cheapestPrice = useMemo(() => sortedPrice?.[0], [sortedPrice]);
    const expensivePrice = useMemo(() => sortedPrice?.[sortedPrice.length - 1], [sortedPrice]);

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

export default useRenderPrices;
