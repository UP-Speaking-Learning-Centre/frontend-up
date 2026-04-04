'use client';

import { useState } from 'react';
import Table from '@/features/dashboard/components/table';
import { useStaffStore } from '../stores/staff-store';
import { StaffMember } from '../types';
import { EditStaffDialog, ViewStaffDialog, DeleteStaffDialog } from './staff-dialogs';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const StaffTable = () => {
    const staffList = useStaffStore(s => s.staffList);

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = staffList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // Ensure current page bounds checking when entries deleted
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedData = staffList.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );

    return (
        <Table<StaffMember>
            isLoading={false}
            columns={[
                { name: 'Name', id: 'name' },
                { name: 'Phone', id: 'phone' },
                { name: 'Role', id: 'role' },
                { name: 'Actions', id: 'actions', width: 'w-32' },
            ]}
            values={paginatedData.map(staff => ({
                id: staff.id,
                name: { renderCell: () => <span className="font-semibold">{staff.name}</span> },
                phone: staff.phone,
                role: staff.role,
                actions: {
                    renderCell: () => (
                        <div className="flex items-center gap-2 px-4">
                            <ViewStaffDialog staff={staff}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-blue-600 hover:text-white"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </ViewStaffDialog>
                            <EditStaffDialog staff={staff}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-amber-600 hover:text-white"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </EditStaffDialog>
                            <DeleteStaffDialog staffId={staff.id} staffName={staff.name}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-white"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </DeleteStaffDialog>
                        </div>
                    ),
                },
            }))}
            pagination={{
                itemsPerPage,
                currentPage: safeCurrentPage,
                totalItems,
                totalPages,
                itemCount: paginatedData.length,
            }}
            onChangePage={page => setCurrentPage(page)}
        />
    );
};
