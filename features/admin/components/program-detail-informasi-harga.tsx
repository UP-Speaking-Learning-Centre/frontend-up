import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useGetPrices from '../queries/useGetPrices';
import ProgramDetailAddFormPrice from './program-detail-add-form-price';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import useEditPrice from '../hooks/useEditPrice';
import { useProgramDetailStore } from '../stores/program-detail';
import { formatAmont } from '@/features/auth/utils/string.helper';
import { LoadingTablePrice } from './loading';
import { PACKAGE_OPTIONS } from '../constants/config';

const ProgramDetailInformasiHarga = () => {
    const isPriceModalOpen = useProgramDetailStore(s => s.isPriceModalOpen);
    const setState = useProgramDetailStore(s => s.setState);

    const { packages, isLoading, columnDuration } = useGetPrices();
    const { handleEdit } = useEditPrice();

    console.log(packages);
    return (
        <section id="harga">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#020817] mt-10 mb-5">
                    Program Detail - Harga
                </h2>
                <ProgramDetailAddFormPrice
                    open={isPriceModalOpen}
                    onOpenChange={open => setState({ isPriceModalOpen: open })}
                />
            </div>
            {isLoading ? (
                <LoadingTablePrice />
            ) : (
                <div className="bg-white border rounded-lg shadow-lg mb-5">
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20px]">No</TableHead>
                                <TableHead>Package</TableHead>
                                {columnDuration.map(col => (
                                    <TableHead key={col}>{col} Bulan</TableHead>
                                ))}
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.keys(packages)
                                .sort(
                                    (a, b) =>
                                        PACKAGE_OPTIONS.findIndex(option => option.label === a) -
                                        PACKAGE_OPTIONS.findIndex(option => option.label === b)
                                )
                                .map((package_, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{package_}</TableCell>
                                        {columnDuration.map(col => (
                                            <TableCell key={col}>
                                                {formatAmont(
                                                    packages[package_].price.find(
                                                        price => price.timeframe === col
                                                    )?.amount || 0
                                                )}
                                            </TableCell>
                                        ))}
                                        <TableCell className="flex gap-2">
                                            <Button
                                                onClick={() =>
                                                    handleEdit(packages[package_].packageId)
                                                }
                                                variant={'outline'}
                                            >
                                                <Edit />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </section>
    );
};

export default ProgramDetailInformasiHarga;
