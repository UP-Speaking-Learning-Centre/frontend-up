import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Pagination } from '@/types/general';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import React from 'react';

type RenderCellType = {
    renderCell: () => string | number | React.ReactNode;
};

type GenericData = Record<string, string | number | RenderCellType | undefined>;

interface ITable<T> {
    columns: { name: string; id: keyof T | string; width?: string }[];
    values: GenericData[] | [];
    pagination?: Pagination;
    onChangePage: (page: number) => void;
    isLoading?: boolean;
}

const Table = <T,>({ columns, values, pagination, onChangePage, isLoading }: ITable<T>) => {
    const startIndex = (currentPage: number, itemsPerPage: number) => {
        return currentPage + itemsPerPage * (currentPage - 1);
    };
    const endIndex = (currentPage: number, itemsPerPage: number) => {
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
                            <table className="w-full max-w-full relative">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        {columns
                                            .filter(col => col.id !== 'actions')
                                            .map((column, idx) => (
                                                <th
                                                    key={column.id.toString()}
                                                    className={cn(
                                                        'text-left p-4  text-neutral-400 font-medium text-xs',
                                                        idx === columns.length - 2 && 'pr-24'
                                                    )}
                                                    style={{ width: column.width }}
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
                                                className={cn((rowIndex + 1) % 2 && 'bg-gray-200')}
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
                                                                    'p-4 truncate text-sm',
                                                                    idx === columns.length - 2 &&
                                                                        'pr-24'
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
                                                className="p-4 text-center"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="absolute bottom-0 right-0 top-0 w-[80px] bg-white shadow-[rgba(0,0,0,0.05)_-1px_0px_2px_1px]">
                                <table className="w-full max-w-full relative">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th
                                                key="actions"
                                                className="text-left p-4 font-medium text-neutral-500 text-xs"
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
                                                                    className="h-[52.5px] relative"
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
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
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
                        <span className="text-sm">
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
