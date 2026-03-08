'use client';

import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsQuery from '@/features/dashboard/queries/use-fetch-students';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { debounce } from '@/utils/function.helper';
import { useCallback, useState } from 'react';

import StudentFilter from '@/features/admin/components/students/student-filter';
import StudentTable from '@/features/admin/components/students/student-table';

const Page = () => {
    const students = useStudentsStore(s => s.students);
    const pagination = useStudentsStore(s => s.pagination);
    const filter = useStudentsStore(s => s.filters);
    const onChangeFilter = useStudentsStore(s => s.onChangeFilter);

    const {
        filters: { groups, mentors, programs },
        onChangePage,
        onChangeSearch,
        onChangeGroup,
        onChangeProgram,
        onChangeMentor,
    } = useFilterStudents(onChangeFilter, filter.program!);
    const { isLoading } = useFetchStudentsQuery();
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            onChangeSearch(value);
        }, 500),
        []
    );

    return (
        <DashboardContentLayout pageTitle="Students">
            <div className="space-y-6">
                <StudentFilter
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    filter={filter}
                    onChangeFilter={onChangeFilter}
                    debouncedSearch={debouncedSearch}
                    programs={programs!}
                    onChangeProgram={onChangeProgram}
                    groups={groups!}
                    onChangeGroup={onChangeGroup}
                    mentors={mentors!}
                    onChangeMentor={onChangeMentor}
                />

                <StudentTable
                    isLoading={isLoading}
                    students={students!}
                    pagination={pagination}
                    onChangePage={onChangePage}
                />
            </div>
        </DashboardContentLayout>
    );
};

export default Page;
