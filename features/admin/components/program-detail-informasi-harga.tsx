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

const ProgramDetailInformasiHarga = () => {
    const isPriceModalOpen = useProgramDetailStore(s => s.isPriceModalOpen);
    const setState = useProgramDetailStore(s => s.setState);

    const { packages, isLoading, columnDuration } = useGetPrices();
    const { handleEdit } = useEditPrice();

    return (
        <section id="harga" className="p-4 bg-white border mx-4 rounded-lg shadow-lg mb-5">
            <div className="p-4">
                <Table className="mb-4">
                    <TableCaption>A list of your recent prices. </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Package</TableHead>
                            {columnDuration.map(col => (
                                <TableHead>
                                    {col} month{Number(col) > 1 && 's'}
                                </TableHead>
                            ))}
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(packages)?.map((package_, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{package_}</TableCell>
                                {columnDuration.map(col => (
                                    <TableCell>
                                        {
                                            packages[package_].price.find(
                                                price => price.timeframe === col
                                            )?.amount
                                        }
                                    </TableCell>
                                ))}
                                <TableCell className="flex gap-2">
                                    <Button
                                        onClick={() => handleEdit(packages[package_].packageId)}
                                        variant={'outline'}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button onClick={() => {}} variant={'destructive'}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ProgramDetailAddFormPrice
                open={isPriceModalOpen}
                onOpenChange={open => setState({ isPriceModalOpen: open })}
            />
        </section>
    );
};

export default ProgramDetailInformasiHarga;
