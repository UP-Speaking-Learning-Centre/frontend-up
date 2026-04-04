import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Pagination } from '@/types/general';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import React from 'react';

type RenderCellType = {
    renderCell: () => string | number | React.ReactNode;
    height?: string;
};

type GenericData = Record<string, string | number | RenderCellType | boolean | undefined>;

interface ITable<T> {
    columns: { name: string; id: keyof T | string; width?: string }[];
    values: GenericData[] | [];
    pagination?: Pagination;
    onChangePage: (page: number) => void;
    isLoading?: boolean;
}

const Table = <T,>({ columns, values, pagination, onChangePage, isLoading }: ITable<T>) => {
    const startIndex = (currentPage: number, itemsPerPage: number) => {
        if (pagination?.totalItems === 0) return 0;
        return currentPage + itemsPerPage * (currentPage - 1);
    };
    const endIndex = (currentPage: number, itemsPerPage: number) => {
        const end = currentPage - 1 + itemsPerPage * currentPage;
        if (end > (pagination?.totalItems || 0)) return pagination?.totalItems;

        return currentPage - 1 + itemsPerPage * currentPage;
    };

    return (
        <>
            <Card>
                <CardContent className="p-0 relative overflow-hidden">
                    {isLoading ? (
                        <div className="p-4 text-center w-full">
                            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full max-w-full relative overflow-hidden">
                                <thead className="bg-white border-b">
                                    <tr>
                                        {columns
                                            .filter(col => col.id !== 'actions')
                                            .map((column, idx) => (
                                                <th
                                                    key={column.id.toString()}
                                                    className={cn(
                                                        'text-left px-6 py-4 rounded-lg text-neutral-500 font-medium text-xs',
                                                        idx === columns.length - 2 && 'pr-24',
                                                        column.width
                                                    )}
                                                >
                                                    {column.name}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!values.length ? (
                                        values.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={cn((rowIndex + 1) % 2 && 'bg-gray-100')}
                                            >
                                                {columns
                                                    .filter(col => col.id !== 'actions')
                                                    .map((col, idx) => {
                                                        const value =
                                                            row[col.id as keyof GenericData];
                                                        return (
                                                            <td
                                                                key={col.id.toString()}
                                                                className={cn(
                                                                    'h-16 px-6 py-2 truncate text-sm',
                                                                    idx === columns.length - 2 &&
                                                                        'pr-24',
                                                                    col.width
                                                                )}
                                                            >
                                                                {typeof value === 'object' &&
                                                                'renderCell' in value
                                                                    ? value.renderCell()
                                                                    : `${value}` || '-'}
                                                            </td>
                                                        );
                                                    })}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="p-4 text-sm text-center"
                                            >
                                                Data Kosong
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="absolute bottom-0 right-0 top-0 min-w-[80px] bg-white shadow-[rgba(0,0,0,0.05)_-1px_0px_2px_1px]">
                                <table className="w-full max-w-full relative">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th
                                                key="actions"
                                                className="text-center px-6 py-4 rounded-lg font-medium bg-white text-neutral-500 text-xs"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!!values.length ? (
                                            values.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {columns
                                                        .filter(col => col.id === 'actions')
                                                        .map(col => {
                                                            const value =
                                                                row[col.id as keyof GenericData];
                                                            return (
                                                                <td
                                                                    key={col.id.toString()}
                                                                    className={cn(
                                                                        (rowIndex + 1) % 2 &&
                                                                            'bg-gray-100',
                                                                        typeof value === 'object' &&
                                                                            'renderCell' in value &&
                                                                            value.height,
                                                                        'h-16 relative'
                                                                    )}
                                                                >
                                                                    {typeof value === 'object' &&
                                                                    'renderCell' in value
                                                                        ? value.renderCell()
                                                                        : `${value} ${value} ${value}` ||
                                                                          '-'}
                                                                </td>
                                                            );
                                                        })}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={columns.length}
                                                    className="p-4 text-center"
                                                >
                                                    -
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {!!pagination && (
                <div className="flex items-center mt-2 justify-between">
                    <p className="text-xs text-gray-600">
                        {`Showing ${startIndex(pagination.currentPage, pagination.itemsPerPage)} to
                        ${endIndex(pagination.currentPage, pagination.itemsPerPage)} of ${
                            pagination.totalItems
                        }
                        users`}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onChangePage(Math.max(1, pagination.currentPage - 1))}
                            disabled={pagination.currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs">
                            Page {pagination.currentPage} of {pagination.totalPages || 1}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onChangePage(
                                    Math.min(pagination.totalPages, pagination.currentPage + 1)
                                )
                            }
                            disabled={
                                pagination.currentPage === pagination.totalPages ||
                                !pagination.totalPages
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Table;
