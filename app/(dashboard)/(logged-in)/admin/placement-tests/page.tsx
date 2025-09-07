'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import React from 'react';
import DashboardFilter from '@/features/dashboard/components/filter';
import { cn } from '@/lib/utils';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import Table from '@/features/dashboard/components/table';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { Button } from '@/components/ui/button';
import useFetchStudentsWithPlacementQuery from '@/features/dashboard/queries/use-fetch-students-with-placement';
import { Badge } from '@/components/ui/badge';
import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import { useRouter } from 'next/navigation';

const Index = () => {
    const { isLoading } = useFetchStudentsWithPlacementQuery();
    const router = useRouter();
    const students = useStudentsStore(s => s.studentsPlacementTest);
    const pagination = useStudentsStore(s => s.paginationPlacementTest);
    const {
        filterPlacementTest: { groups, mentors, status },
        onChangeFilter,
        onChangePage,
    } = useFilterStudents();

    const [isFilterOpen, setIsFilterOpen] = React.useState(true);

    console.log(students);

    if (isLoading && !students.length) {
        return (
            <DashboardContentLayout pageTitle="Placement Tests">
                <div>Loading...</div>
            </DashboardContentLayout>
        );
    }

    return (
        <DashboardContentLayout pageTitle="Placement Tests">
            <div className="space-y-6 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Filter className="size-5" />
                                Filters
                            </div>
                            <div className="size-8 flex items-center justify-center border border-primary rounded-sm cursor-pointer">
                                <ChevronDown
                                    className={cn(
                                        'size-5 transition-all duration-300 text-primary ease-in-out',
                                        isFilterOpen ? 'rotate-180' : ''
                                    )}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div
                            className={cn(
                                'grid grid-cols-1 mx-6 mt-0 overflow-hidden md:grid-cols-4 gap-4 h-fit transition-all duration-300 ease-in-out',
                                isFilterOpen ? 'max-h-[50vh] mb-6' : 'max-h-0 mb-0'
                            )}
                        >
                            <div className="flex flex-col items-start gap-2">
                                <Label>Search Name/Phone</Label>
                                <Input placeholder="Search..." />
                            </div>
                            <DashboardFilter
                                label="Group"
                                options={groups}
                                onSelect={() => {}}
                                defaultValue="All Groups"
                            />
                            <DashboardFilter
                                label="Mentor"
                                options={mentors}
                                onSelect={() => {}}
                                defaultValue="All Mentors"
                            />
                            <DashboardFilter
                                label="Status"
                                options={status}
                                onSelect={() => {}}
                                defaultValue="All Status"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Table
                    columns={[
                        { name: 'Name', id: 'name', width: '20%' },
                        { name: 'Phone', id: 'phone' },
                        { name: 'Program (Group)', id: 'program' },
                        { name: 'Status', id: 'status' },
                        { name: 'Test Date', id: 'testDate' },
                        { name: 'Actions', id: 'actions' },
                    ]}
                    values={students.map(user => {
                        return {
                            ...user,
                            program: {
                                renderCell: () => (
                                    <div className="flex items-center gap-2">
                                        {user.program} ({user.group})
                                    </div>
                                ),
                            },
                            status: {
                                renderCell: () => (
                                    <Badge className="flex items-center gap-2">
                                        {
                                            PLACEMENT_TEST_FILTER_OPTIONS.find(
                                                option => option.id === user.testStatus
                                            )?.name
                                        }
                                    </Badge>
                                ),
                            },
                            testDate: {
                                renderCell: () => (
                                    <div className="flex items-center gap-2">{user.testDate}</div>
                                ),
                            },
                            actions: {
                                renderCell: () => (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:text-white"
                                        onClick={() =>
                                            router.push(`/admin/placement-tests/${user.id}`)
                                        }
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                ),
                            },
                        };
                    })}
                    pagination={pagination}
                    onChangePage={page => onChangePage(page)}
                />
            </div>
        </DashboardContentLayout>
    );
};

export default Index;
