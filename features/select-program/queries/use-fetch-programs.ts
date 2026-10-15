import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ProgramType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchPrograms = async (): Promise<ProgramType[]> => {
    const [resPrograms, resPrices, resPackages] = await Promise.all([
        api.get<any>(ENDPOINTS.fetchPrograms),
        api.get<any>(ENDPOINTS.fetchPrices).catch(() => ({ data: [] })),
        api.get<any>(ENDPOINTS.fetchPackages).catch(() => ({ data: [] })),
    ]);

    const rawPrograms = Array.isArray(resPrograms.data)
        ? resPrograms.data
        : resPrograms.data?.data || [];

    const rawPrices = Array.isArray(resPrices.data)
        ? resPrices.data
        : resPrices.data?.data || [];

    const rawPackages = Array.isArray(resPackages.data)
        ? resPackages.data
        : resPackages.data?.data || [];

    const packageMap = new Map<number, string>();
    rawPackages.forEach((pkg: any) => {
        if (pkg?.id) {
            packageMap.set(Number(pkg.id), pkg.name || '');
        }
    });

    return rawPrograms.map((program: any) => {
        // Find prices matching this program from /prices
        const matchedPrices = rawPrices
            .filter((p: any) => Number(p.program_id ?? p.program?.id) === Number(program.id))
            .map((p: any) => {
                const packageId = Number(p.package_id ?? p.package?.id);
                const packageName =
                    p.package?.name || packageMap.get(packageId) || (packageId === 1 ? 'Semi Private' : packageId === 2 ? 'Private' : packageId === 3 ? 'Exclusive' : '');

                return {
                    id: p.id,
                    timeframe: p.timeframe,
                    amount: p.amount,
                    package: {
                        id: packageId,
                        name: packageName,
                    },
                };
            });

        return {
            ...program,
            prices: matchedPrices.length > 0 ? matchedPrices : program.prices || [],
        };
    });
};

const useFetchProgramsQuery = (): UseQueryResult<ProgramType[]> => {
    const res = useQuery({
        queryKey: ['programs'],
        queryFn: fetchPrograms,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return res;
};

export default useFetchProgramsQuery;
