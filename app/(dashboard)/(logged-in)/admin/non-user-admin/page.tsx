'use client';

import { useEffect } from 'react';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import NonUserFilterDrawer from '@/features/non-user/components/filter-drawer';
import NonUserTable from '@/features/non-user/components/non-user-table';
import { useNonUserFilterStore } from '@/features/non-user/stores/filter-store';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';
import { getActiveFilterCount } from '@/utils/user.helper';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function NonUserAdminPage() {
    const setDrawerOpen = useNonUserFilterStore(s => s.setDrawerOpen);
    const filters = useNonUserFilterStore(s => s.filters);
    const isPicDefault = useNonUserFilterStore(s => s.isPicDefault);
    const resetFilters = useNonUserFilterStore(s => s.resetFilters);

    useEffect(() => {
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    const activeFilterCount = getActiveFilterCount(filters, isPicDefault);

    return (
        <DashboardContentLayout pageTitle="Non List User - Process By Admin Team">
            <div className="space-y-6">
                <div className="w-full flex justify-end gap-3">
                    <Link href={ROUTES.adminNonUserCreate}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Tambah Non User
                        </Button>
                    </Link>
                    <Button 
                        variant="outline" 
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="size-4" />
                        {activeFilterCount > 0 ? `Filter (${activeFilterCount})` : 'Filter'}
                    </Button>
                </div>

                <NonUserFilterDrawer menuType="admin" />
                <NonUserTable menuType="admin" />
            </div>
        </DashboardContentLayout>
    );
}
