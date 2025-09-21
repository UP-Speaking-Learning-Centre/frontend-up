'use client';
import { Delete, Edit, Plus, Trash, X } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import clsx from 'clsx';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ProgramDetailAddFormPrice from './program-detail-add-form-price';

const ProgramDetailDrawer = () => {
    const setState = useProgramDetailStore(s => s.setState);
    const isDrawerOpen = useProgramDetailStore(s => s.isDrawerOpen);

    const packages = [
        { name: 'Semi-Private', items: [{ duration: 1, price: 100000 }] },
        { name: 'Private', items: [{ duration: 2, price: 200000 }] },
        { name: 'Eksklusif', items: [{ duration: 3, price: 300000 }] },
    ];
    const columDuration = [1, 2, 3];

    return (
        <div
            className={clsx(
                'block fixed bg-white w-[400px] min-h-[100vh] shadow-lg right-0 top-0 transition-all p-4 overflow-auto',
                !isDrawerOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            {/* <div className="flex items-center justify-between p-[9.5px] px-4 border-b">
                <h2 className="text-md font-bold text-gray-900">Program Detail</h2>
                <button
                    onClick={() => setState({ isDrawerOpen: false })}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
            </div> */}
            <div className="flex items-center justify-between p-[9.5px] px-4 border-b">
                <h2 className="text-md font-bold text-gray-900">Informasi Harga</h2>
                <button
                    onClick={() => setState({ isDrawerOpen: false })}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
            </div>

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

            {/* <div className="p-6 space-y-6">
                <div className="w-full h-64 bg-blue-100 rounded-lg overflow-hidden">
                    <img
                        src="/placeholder.svg"
                        alt="Happy school children in uniforms raising hands"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Nama Program</h3>
                    <h4 className="text-md font-bold text-gray-900">School Program</h4>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Deskripsi Program</h3>
                    <p className="text-gray-900 leading-relaxed">
                        Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus
                        lebih pede tampil di kelas maupun lomba.
                    </p>
                </div>
            </div> */}
            <ProgramDetailAddFormPrice />
        </div>
    );
};

export default ProgramDetailDrawer;
