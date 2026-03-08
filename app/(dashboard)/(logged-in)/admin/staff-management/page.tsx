'use client';

import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StaffTable } from '@/features/staff-management/components/staff-table';
import { AddStaffDialog } from '@/features/staff-management/components/staff-dialogs';

export default function StaffManagementPage() {
    return (
        <DashboardContentLayout pageTitle="Staff Management">
            <div className="space-y-6">
                <div className="w-full flex justify-end">
                    <AddStaffDialog>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Tambah Staff
                        </Button>
                    </AddStaffDialog>
                </div>
                
                <StaffTable />
            </div>
        </DashboardContentLayout>
    );
}
