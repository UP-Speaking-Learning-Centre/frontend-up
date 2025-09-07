import useFetchGroupsQuery from '@/features/select-program/queries/use-fetch-groups';
import { useState } from 'react';
import { useStudentsStore } from '../stores/students-store';
import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';

const mentors = [
    { id: 1, name: 'Mentor 1' },
    { id: 2, name: 'Mentor 2' },
    { id: 3, name: 'Mentor 3' },
];

const useFilterStudents = () => {
    const { data: groupsData } = useFetchGroupsQuery();
    const setPagination = useStudentsStore(s => s.setPagination);

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeFilter = (filter: string, value: string) => {
        console.log(filter, value);
    };

    const onChangePage = (page: number) => {
        setPagination({ currentPage: page });
    };

    return {
        filters: { groups: [...(groupsData || [])], mentors },
        filterPlacementTest: {
            groups: [...(groupsData || [])],
            mentors,
            status: PLACEMENT_TEST_FILTER_OPTIONS,
        },
        onChangePage,
        onChangeFilter,
    };
};

export default useFilterStudents;
