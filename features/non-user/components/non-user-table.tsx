'use client';

import Table from '@/features/dashboard/components/table';
import { FunnelStage, LeadStatus, Role, SourceLead } from '../types';
import { NonUserItem } from '@/types/non-user';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

import { useState, useMemo } from 'react';
import { useFetchListNonUsers } from '../queries/use-fetch-list-non-users';
import { useNonUserFilterStore } from '../stores/filter-store';
import { ADMIN_ROLES } from '@/utils/user.helper';
import { cn } from '@/lib/utils';

const getLeadStatusColor = (status: string) => {
    switch (status) {
        case LeadStatus.Lost:
            return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
        case LeadStatus.Cold:
            return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
        case LeadStatus.Warm:
            return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
        case LeadStatus.Hot:
            return 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200';
        case LeadStatus.Converted:
            return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
};

const getFunnelStageColor = (stage: string) => {
    switch (stage) {
        case FunnelStage.Asking:
            return 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200';
        case FunnelStage.Qualification:
            return 'bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200';
        case FunnelStage.TrialClass:
            return 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200';
        case FunnelStage.PlacementTest:
            return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
        case FunnelStage.Quotation:
            return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-200';
        case FunnelStage.Registered:
            return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
        case FunnelStage.Cancel:
            return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
};

export default function NonUserMarketingTable({ menuType }: { menuType: 'marketing' | 'admin' }) {
    const filters = useNonUserFilterStore(s => s.filters);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // We get menuType dynamically from context or just fetch based on active filters
    // Admin vs Marketing differences are handled by the filter store (default PICs etc.)
    const { data: responseData, isLoading } = useFetchListNonUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: filters.studentName,
        sourceLead: undefined, // Add to filters if necessary later
        funnelStage: filters.funnelStage,
        statusLead: filters.statusLead,
        picRole:
            menuType === 'marketing'
                ? [Role.StaffMarketing]
                : filters.picRole && filters.picRole.length > 0
                  ? filters.picRole
                  : ADMIN_ROLES,
        picStaff: filters.picStaff,
        lastFollowUpFrom: filters.lastFollowUpFrom,
        lastFollowUpTo: filters.lastFollowUpTo,
    });

    const paginatedData = responseData?.data || [];
    const meta = responseData?.meta || {
        totalItems: 0,
        totalPages: 0,
        itemCount: 0,
        itemsPerPage: 10,
        currentPage: 1,
    };

    return (
        <Table<any>
            isLoading={isLoading}
            columns={[
                { name: 'Name', id: 'name', width: 'whitespace-nowrap' },
                { name: 'Phone', id: 'phone', width: 'whitespace-nowrap' },
                { name: 'Source Lead', id: 'sourceLead', width: 'whitespace-nowrap' },
                { name: 'Funnel Stage', id: 'funnelStage', width: 'whitespace-nowrap' },
                { name: 'Lead Status', id: 'statusLead', width: 'whitespace-nowrap' },
                { name: 'PIC', id: 'pic', width: 'whitespace-nowrap' },
                { name: 'Last Follow Up', id: 'lastUpdate', width: 'whitespace-nowrap' },
                { name: 'Program Diminati', id: 'programDiminati', width: 'whitespace-nowrap' },
                {
                    name: 'Tanggal Trial Class',
                    id: 'tanggalTrialClass',
                    width: 'whitespace-nowrap',
                },
                {
                    name: 'Teacher Trial Class',
                    id: 'teacherTrialClass',
                    width: 'whitespace-nowrap',
                },
                { name: 'Grup Trial Class', id: 'grupTrialClass', width: 'whitespace-nowrap' },
                { name: 'Datang Trial Class', id: 'datangTrialClass', width: 'whitespace-nowrap' },
                { name: 'Notes Terbaru', id: 'notesTerbaru', width: 'whitespace-nowrap' },
                { name: 'Actions', id: 'actions' },
            ]}
            values={paginatedData.map(
                (item: NonUserItem, index: number) =>
                    ({
                        ...item,
                        name: {
                            renderCell: () => (
                                <span className="font-semibold whitespace-nowrap">{item.name}</span>
                            ),
                        },
                        phone: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">{item.phoneNumber}</span>
                            ),
                        },
                        funnelStage: {
                            renderCell: () => (
                                <Badge
                                    className={cn(
                                        'whitespace-nowrap font-medium',
                                        getFunnelStageColor(item.funnelStage)
                                    )}
                                    variant="outline"
                                >
                                    {item.funnelStage || '-'}
                                </Badge>
                            ),
                        },
                        statusLead: {
                            renderCell: () => (
                                <Badge
                                    className={cn(
                                        'whitespace-nowrap font-medium',
                                        getLeadStatusColor(item.statusLead)
                                    )}
                                    variant="outline"
                                >
                                    {item.statusLead || '-'}
                                </Badge>
                            ),
                        },
                        pic: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.picStaff || item.picRole || '-'}
                                </span>
                            ),
                        },
                        lastUpdate: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.lastUpdate
                                        ? moment(item.lastUpdate).format('DD MMM YYYY, HH:mm')
                                        : '-'}
                                </span>
                            ),
                        },
                        programDiminati: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">{item.programName || '-'}</span>
                            ),
                        },
                        tanggalTrialClass: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.tanggalTrialClass
                                        ? moment(item.tanggalTrialClass).format(
                                              'DD MMM YYYY, HH:mm'
                                          )
                                        : '-'}
                                </span>
                            ),
                        },
                        teacherTrialClass: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.teacherTrialClass || '-'}
                                </span>
                            ),
                        },
                        grupTrialClass: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.grupTrialClass || '-'}
                                </span>
                            ),
                        },
                        notesTerbaru: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">{item.notes || '-'}</span>
                            ),
                        },
                        datangTrialClass: {
                            renderCell: () => <span>{item.datangTrialClass ? 'Ya' : 'Belum'}</span>,
                        },
                        actions: {
                            renderCell: () => (
                                <Link href={`/admin/students/detail/${item.studentId}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ),
                        },
                    }) as any
            )}
            pagination={{
                itemsPerPage: meta.itemsPerPage,
                currentPage: meta.currentPage,
                totalItems: meta.totalItems,
                totalPages: meta.totalPages,
                itemCount: meta.itemCount,
            }}
            onChangePage={page => setCurrentPage(page)}
        />
    );
}
