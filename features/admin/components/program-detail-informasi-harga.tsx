import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';
import ProgramDetailAddFormPrice from './program-detail-add-form-price';

const packages = [
    { name: 'Semi-Private', items: [{ duration: 1, price: 100000 }] },
    { name: 'Private', items: [{ duration: 2, price: 200000 }] },
    { name: 'Eksklusif', items: [{ duration: 3, price: 300000 }] },
];
const columDuration = [1, 2, 3];

const ProgramDetailInformasiHarga = () => {
    return (
        <section id='harga' className="p-4 bg-white border mx-4 rounded-lg shadow-lg mb-5">
            <div className="p-4">
                <Table className="mb-4">
                    <TableCaption>A list of your recent prices. </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Package</TableHead>
                            {columDuration.map(col => (
                                <TableHead>
                                    {col} month{col > 1 && 's'}
                                </TableHead>
                            ))}
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packages.map((package_, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{package_.name}</TableCell>
                                {columDuration.map(col => (
                                    <TableCell>
                                        {package_.items.find(item => item.duration === col)
                                            ?.price ?? '-'}
                                    </TableCell>
                                ))}
                                <TableCell className="flex gap-2">
                                    <Button variant={'outline'}>
                                        <Edit />
                                    </Button>
                                    <Button variant={'destructive'}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ProgramDetailAddFormPrice />
        </section>
    );
};

export default ProgramDetailInformasiHarga;
