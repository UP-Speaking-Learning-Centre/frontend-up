import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Pagination as PaginationType } from '@/types/general';
import { useState } from 'react';

interface AdminPaginationProps {
    pagination: PaginationType;
    setPagination: (pagination: PaginationType) => void;
}
const AdminPagination = ({ pagination, setPagination }: AdminPaginationProps) => {
    const [jumpPage, setJumpPage] = useState<number>(pagination.currentPage);

    const onChangePage = (page: number) => {
        setPagination({ ...pagination, currentPage: page });
        setJumpPage(page);
    };
    const handleJump = () => {
        if (jumpPage > pagination.totalPages) return onChangePage(pagination.totalPages);
        if (jumpPage < 1) return onChangePage(1);
        onChangePage(Number(jumpPage));
    };

    return (
        <Pagination className="mt-4 justify-end">
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        disabled={pagination.currentPage === 1}
                        onClick={() =>
                            pagination.currentPage > 1 && onChangePage(pagination.currentPage - 1)
                        }
                        aria-disabled={pagination.currentPage === 1}
                    />
                </PaginationItem>

                {/* Numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p, i) => {
                        if(pagination.totalPages < 4) return true
                        if (pagination.currentPage < pagination.totalPages - 2) {
                            return p < pagination.totalPages - 1;
                        }
                        return (
                            p > pagination.currentPage - pagination.currentPage + 1 &&
                            p <= pagination.totalPages
                        );
                    })
                    .map((p, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={p === pagination.currentPage}
                                onClick={() => onChangePage(p as number)}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                {pagination.currentPage < pagination.totalPages - 2 && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem>
                            <PaginationLink
                                isActive={pagination.totalPages === pagination.currentPage}
                                onClick={() => onChangePage(pagination.totalPages as number)}
                            >
                                {pagination.totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        disabled={pagination.currentPage === pagination.totalPages}
                        onClick={() =>
                            pagination.currentPage < pagination.totalPages &&
                            onChangePage(pagination.currentPage + 1)
                        }
                        aria-disabled={pagination.currentPage === pagination.totalPages}
                    />
                </PaginationItem>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        min={1}
                        max={pagination.totalPages}
                        value={jumpPage}
                        onChange={e => setJumpPage(Number(e.target.value))}
                        placeholder="Page #"
                        className="w-14"
                    />
                    <Button onClick={handleJump}>Go</Button>
                </div>
            </PaginationContent>
        </Pagination>
    );
};

export default AdminPagination;
