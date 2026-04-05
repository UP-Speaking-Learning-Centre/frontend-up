'use client';

import Table from '@/features/dashboard/components/table';
import { FunnelStage, LeadStatus, Role, SourceLead } from '../types';
import { NonUserItem } from '@/types/non-user';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

import { useState, useMemo } from 'react';
import { useFetchListNonUsers } from '../queries/use-fetch-list-non-users';
import { useNonUserFilterStore } from '../stores/filter-store';
import { ADMIN_ROLES } from '@/utils/user.helper';

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
        statusLead: filters.leadStatus,
        picRole: menuType === 'marketing'
            ? [Role.StaffMarketing]
            : (filters.picRole && filters.picRole.length > 0 ? filters.picRole : ADMIN_ROLES),
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
                { name: 'Lead Status', id: 'leadStatus', width: 'whitespace-nowrap' },
                { name: 'PIC', id: 'pic', width: 'whitespace-nowrap' },
                { name: 'Last Follow Up', id: 'lastFollowUp', width: 'whitespace-nowrap' },
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
                        pic: {
                            renderCell: () => (
                                <span className="whitespace-nowrap">
                                    {item.picStaff || item.picRole || '-'}
                                </span>
                            ),
                        },
                        lastFollowUp: {
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
                                <Link href={`#`}>
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
