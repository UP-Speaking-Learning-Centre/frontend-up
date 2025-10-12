import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import React from 'react';

export const LoadingTablePrice = () => {
    return (
        <div className="bg-white border rounded-lg shadow-lg mb-5">
            <Table className="mb-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20px]">No</TableHead>
                        <TableHead>Package</TableHead>
                        {[...new Array(3)].map((_, index) => (
                            <TableHead key={index}>
                                <Skeleton className="w-32 h-8" />
                            </TableHead>
                        ))}
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...new Array(3)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-center">{index + 1}</TableCell>
                            <TableCell>
                                <Skeleton className="w-32 h-8" />
                            </TableCell>
                            {[...Array(3)].map((col, index) => (
                                <TableCell key={index}>
                                    <Skeleton className="w-32 h-8" />
                                </TableCell>
                            ))}
                            <TableCell className="flex gap-2">
                                <Skeleton className="w-8 h-8" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
