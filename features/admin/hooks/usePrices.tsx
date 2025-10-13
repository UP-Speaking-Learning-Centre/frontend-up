import { PriceData } from '@/types/admin';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import useGetPrices from '../queries/useGetPrices';
import usePatchPrice from '../queries/usePatchPrice';
import { useProgramDetailStore } from '../stores/program-detail';
import { useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';

const usePrices = () => {
    const queryClient = useQueryClient();
    const packages = useProgramDetailStore(s => s.packages);
    const setState = useProgramDetailStore(s => s.setState);
    const packageId = useProgramDetailStore(s => s.packageId);

    const PriceItemSchema = z.object({
        timeframe: z.string().min(1, 'Harus diisi'),
        amount: z.number().min(1, 'Harus diisi'),
    });
    const PriceSchema = z.object({
        prices: z
            .array(PriceItemSchema)
            .min(1, 'Minimum 1 price for adding new item')
            .superRefine((arr, ctx) => {
                const seen = new Map<number, number[]>(); // duration -> index[]

                arr.forEach((item, index) => {
                    if (!seen.has(+item.timeframe)) {
                        seen.set(+item.timeframe, [index]);
                    } else {
                        seen.get(+item.timeframe)!.push(index);
                    }
                });

                // cek kalau ada lebih dari satu index utk durasi yg sama
                for (const [_, indices] of seen) {
                    if (indices.length > 1) {
                        indices.forEach(i => {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'Durasi tidak boleh sama',
                                path: [i, 'timeframe'], // kasih error langsung ke field duration
                            });
                        });
                    }
                }
            }),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { id } = useParams();
    const { data } = useGetPrices({ packageId, programId: id });
    const { mutateAsync } = usePatchPrice();

    useEffect(() => {
        if (id && packageId) {
            const rawPackages =
                data?.data
                    .map(
                        price =>
                            ({
                                durationType: 'months',
                                duration: price.timeframe.split('_')[0],
                                id: price.id.toString(),
                                price: price.amount.toString(),
                            } satisfies PriceData)
                    )
                    .sort((a, b) => Number(a.duration) - Number(b.duration)) || [];

            setState({
                packageId,
                rawPackages,
                packages: rawPackages,
            });
        }
    }, [id, packageId, data]);

    const addPackage = () => {
        const newPackage: PriceData = {
            id: Date.now().toString(),
            price: '',
            duration: '',
            durationType: 'months',
        };
        setState({ packages: [...packages, newPackage] });
    };

    const validateInvalidPackages = () => {
        const parsed = PriceSchema.safeParse({
            prices: packages.map(item => ({
                timeframe: item.duration,
                amount: Number(item.price),
            })),
        });
        if (!parsed.success) {
            setState({ error: parsed.error.format().prices });
            return parsed.success;
        } else {
            console.log('✅ Valid:', parsed.data);
        }
        return parsed.success;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInvalidPackages()) {
            // toast.error('Missing Information', { position: 'top-center' });
            return;
        }

        try {
            // Simulate API call - replace with your actual API endpoint
            mutateAsync({
                packageId: packageId || 0,
                programId: Number(id),
                replaceAll: true,
                prices: packages.map(item => ({
                    timeframe: item.duration + '_' + item.durationType,
                    amount: Number(item.price),
                })),
            }).then(() => {
                toast.success('Pengaturan harga berhasil disimpan!', {
                    className: 'bg-green-200 border-green-300',
                    position: 'top-center',
                });
                queryClient.invalidateQueries({ queryKey: [ENDPOINTS.fetchPrices] });
            });
        } catch (error) {
            toast.error('Failed to add prices. Please try again.', { position: 'top-center' });
        } finally {
            setIsSubmitting(false);
            setState({ isPriceModalOpen: false });
        }
    };

    return { isSubmitting, handleSubmit, addPackage };
};

export default usePrices;
