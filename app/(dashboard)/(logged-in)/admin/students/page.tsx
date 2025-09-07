'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DashboardFilter from '@/features/dashboard/components/filter';
import Table from '@/features/dashboard/components/table';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsQuery from '@/features/dashboard/queries/use-fetch-students';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { cn } from '@/lib/utils';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import React, { useState } from 'react';

const Page = () => {
    const { isLoading } = useFetchStudentsQuery();
    const students = useStudentsStore(s => s.students);
    const pagination = useStudentsStore(s => s.pagination);
    const {
        filters: { groups, mentors },
        onChangeFilter,
        onChangePage,
    } = useFilterStudents();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    if (isLoading && !students.length) {
        return <DashboardContentLayout pageTitle="Students">Loading...</DashboardContentLayout>;
    }

    return (
        <DashboardContentLayout pageTitle="Students">
            <div className="space-y-6">
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
                                'grid grid-cols-1 mx-6 mt-0 overflow-hidden md:grid-cols-3 gap-4 h-fit transition-all duration-300 ease-in-out',
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
                        </div>
                    </CardContent>
                </Card>

                <Table
                    columns={[
                        { name: 'Name', id: 'name' },
                        { name: 'Phone', id: 'phone' },
                        { name: 'Program (Group)', id: 'program' },
                        { name: 'Mentor', id: 'mentor' },
                        { name: 'Schedule', id: 'schedule' },
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
                            actions: {
                                renderCell: () => (
                                    <Button variant="outline" size="sm">
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

export default Page;
