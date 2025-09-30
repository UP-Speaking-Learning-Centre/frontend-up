import ENDPOINTS from '@/constants/endpoints';
import { Price } from '@/types/admin';
import { BaseResponse } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useGetPrices = () => {
    const { id } = useParams();
    const get = async (): Promise<BaseResponse<Price[]>> => {
        // const mentors = await api.get<TeacherAdmin[]>(ENDPOINTS.fetchTeachers);
        const dummy = {
            meta: {
                currentPage: 1,
                itemsPerPage: 20,
                totalItems: 13,
                totalPages: 1,
                itemCount: 10,
            },
            data: [
                {
                    id: 1,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 2,
                        name: 'Private',
                    },
                    timeframe: '1_month',
                    amount: 1049000,
                },
                {
                    id: 3,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 1,
                        name: 'Semi Private',
                    },
                    timeframe: '1_month',
                    amount: 499000,
                },
                {
                    id: 4,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 2,
                        name: 'Private',
                    },
                    timeframe: '1_month',
                    amount: 499000,
                },
                {
                    id: 5,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 1,
                        name: 'Semi Private',
                    },
                    timeframe: '1_month',
                    amount: 349000,
                },
                {
                    id: 6,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 3,
                        name: 'Exclusive',
                    },
                    timeframe: '1_month',
                    amount: 1499000,
                },
                {
                    id: 2,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 3,
                        name: 'Exclusive',
                    },
                    timeframe: '1_month',
                    amount: 999000,
                },
                {
                    id: 8,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 1,
                        name: 'Semi Private',
                    },
                    timeframe: '2_months',
                    amount: 899000,
                },
                {
                    id: 7,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 2,
                        name: 'Private',
                    },
                    timeframe: '2_months',
                    amount: 1899000,
                },
                {
                    id: 9,
                    program: {
                        id: 2,
                        name: 'Regular / Adults Program',
                    },
                    package: {
                        id: 3,
                        name: 'Exclusive',
                    },
                    timeframe: '2_months',
                    amount: 2599000,
                },
                {
                    id: 13,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 2,
                        name: 'Private',
                    },
                    timeframe: '3_months',
                    amount: 1299000,
                },
                {
                    id: 14,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 2,
                        name: 'Private',
                    },
                    timeframe: '5_months',
                    amount: 2000000,
                },
                {
                    id: 12,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 1,
                        name: 'Semi Private',
                    },
                    timeframe: '6_months',
                    amount: 1999000,
                },
                {
                    id: 10,
                    program: {
                        id: 1,
                        name: 'School Program',
                    },
                    package: {
                        id: 3,
                        name: 'Exclusive',
                    },
                    timeframe: '6_months',
                    amount: 5299000,
                },
            ],
        } satisfies BaseResponse<Price[]>;
        return dummy;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchPrices],
        queryFn: get,
        select: data => ({
            ...data,
            data: data.data.filter(item => item.program.id === Number(id)),
        }),
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
        const packages: Record<string, { price: { amount: number; timeframe: string }[] }> = {};
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

    return {  isLoading, columnDuration,packages };
};

export default useGetPrices;
