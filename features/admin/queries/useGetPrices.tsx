import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { Price } from '@/types/admin';
import { BaseResponse } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useGetPrices = (params?: any) => {
    const { id } = useParams();
    const get = async (): Promise<BaseResponse<Price[]>> => {
        const price = await api.get<BaseResponse<Price[]>>(ENDPOINTS.fetchPrices, { params });
        return price.data;
    };

    const handleEnabled = () =>{
        if(!params) return true;
        const params_ = Object.values(params)
        if(!params_.length) return true
        return params_.every(param => param)
    }

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchPrices, params],
        queryFn: get,
        select: data => ({
            ...data,
            data: data.data.filter(item => item.program.id === Number(id)),
        }),
        enabled: handleEnabled()
    });

    const columnDuration = useMemo(() => {
        const columns: string[] = [];
        data?.data.forEach(item => {
            const number_ = item.timeframe.split('_')[0];
            if (!columns.length) {
                columns.push(number_);
                return;
            }
            if (!columns.includes(number_)) {
                columns.push(number_);
                return;
            }
        });
        return columns;
    }, [data?.data]);

    const packages = useMemo(() => {
        const packages: Record<
            string,
            { price: { amount: number; timeframe: string }[]; packageId: number }
        > = {};
        data?.data.forEach(item => {
            const packageName = item.package.name;
            const number_ = item.timeframe.split('_')[0];

            if (!packages[packageName]) {
                packages[packageName] = {
                    price: [
                        {
                            amount: item.amount,
                            timeframe: number_,
                        },
                    ],
                    packageId: item.package.id,
                };
                return;
            }
            if (!packages[packageName].price.some(price => price.timeframe === number_)) {
                packages[packageName].price = [
                    ...packages[packageName].price,
                    { amount: item.amount, timeframe: number_ },
                ];
                return;
            }
        });
        return packages;
    }, [data?.data]);

    return { isLoading, columnDuration, packages, data };
};

export default useGetPrices;
