'use client';

import Table from '@/features/dashboard/components/table';
import { NonUserMarketingType, FunnelStage, LeadStatus, Role, SourceLead } from '../types';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const mockData: NonUserMarketingType[] = [
    {
        name: 'Andi',
        phone: '081234567890',
        sourceLead: SourceLead.Website,
        funnelStage: FunnelStage.Asking,
        leadStatus: LeadStatus.Cold,
        pic: Role.StaffMarketing,
        lastFollowUp: '2024-03-20T10:00:00Z',
        programDiminati: 'Kindergarten',
        tanggalTrialClass: '-',
        teacherTrialClass: '-',
        grupTrialClass: '-',
        datangTrialClass: false,
        notesTerbaru: 'Tanya info',
    },
    {
        name: 'Budi',
        phone: '081987654321',
        sourceLead: SourceLead.Event,
        funnelStage: FunnelStage.TrialClass,
        leadStatus: LeadStatus.Warm,
        pic: Role.LeadMarketing,
        lastFollowUp: '2024-03-21T14:30:00Z',
        programDiminati: 'Primary',
        tanggalTrialClass: '2024-03-25',
        teacherTrialClass: 'Miss Sarah',
        grupTrialClass: 'Group A',
        datangTrialClass: true,
        notesTerbaru: 'Datang trial besok',
    },
];

import { useState } from 'react';

export default function NonUserMarketingTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Simulate larger mock data set for pagination testing
    const expandedMockData = Array.from({ length: 45 }, (_, i) => ({
        ...mockData[i % mockData.length],
        name: `${mockData[i % mockData.length].name} ${i + 1}`
    }));

    const totalItems = expandedMockData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = expandedMockData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Table<NonUserMarketingType>
            isLoading={false}
            columns={[
                { name: 'Name', id: 'name', width: 'whitespace-nowrap' },
                { name: 'Phone', id: 'phone', width: 'whitespace-nowrap' },
                { name: 'Source Lead', id: 'sourceLead', width: 'whitespace-nowrap' },
                { name: 'Funnel Stage', id: 'funnelStage', width: 'whitespace-nowrap' },
                { name: 'Lead Status', id: 'leadStatus', width: 'whitespace-nowrap' },
                { name: 'PIC', id: 'pic', width: 'whitespace-nowrap' },
                { name: 'Last Follow Up', id: 'lastFollowUp', width: 'whitespace-nowrap' },
                { name: 'Program Diminati', id: 'programDiminati', width: 'whitespace-nowrap' },
                { name: 'Tanggal Trial Class', id: 'tanggalTrialClass', width: 'whitespace-nowrap' },
                { name: 'Teacher Trial Class', id: 'teacherTrialClass', width: 'whitespace-nowrap' },
                { name: 'Grup Trial Class', id: 'grupTrialClass', width: 'whitespace-nowrap' },
                { name: 'Datang Trial Class', id: 'datangTrialClass', width: 'whitespace-nowrap' },
                { name: 'Notes Terbaru', id: 'notesTerbaru', width: 'whitespace-nowrap' },
                { name: 'Actions', id: 'actions' },
            ]}
            values={paginatedData.map((item, index) => ({
                ...item,
                name: { renderCell: () => <span className="font-semibold whitespace-nowrap">{item.name}</span> },
                lastFollowUp: { renderCell: () => <span className="whitespace-nowrap">{moment(item.lastFollowUp).format('DD MMM YYYY, HH:mm')}</span> },
                datangTrialClass: { renderCell: () => <span>{item.datangTrialClass ? 'Ya' : 'Belum'}</span> },
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
                    )
                }
            }))}
            pagination={{ itemsPerPage, currentPage, totalItems, totalPages, itemCount: paginatedData.length }}
            onChangePage={(page) => setCurrentPage(page)}
        />
    );
}
