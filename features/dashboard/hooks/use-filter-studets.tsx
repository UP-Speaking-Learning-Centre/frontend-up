import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import useFetchGroupsQuery from '@/features/select-program/queries/use-fetch-groups';
import { useState } from 'react';
import { useStudentsStore } from '../stores/students-store';

const mentors = [
    { id: 1, name: 'Mentor 1' },
    { id: 2, name: 'Mentor 2' },
    { id: 3, name: 'Mentor 3' },
];

const useFilterStudents = () => {
    const { data: groupsData } = useFetchGroupsQuery();
    const setPagination = useStudentsStore(s => s.setPagination);
    const setSearch = useStudentsStore(s => s.onChangeFilter);

    // const onChangeFilter = (filter: string, value: string) => {
    //     switch (filter) {
    //         case 'search':
    //             onChangeSearch(value);
    //             return;
    //         case 'group':
    //             onChangeGroup(value);
    //             return;
    //         case 'mentor':
    //             onChangeMentor(value);
    //             return;
    //         default:
    //             return;
    //     }
    // };

    const onChangePage = (page: number) => {
        setPagination({ currentPage: page });
    };
    const onChangeSearch = (string: string) => {
        setSearch('searchQuery', string);
    };
    const onChangeGroup = (group: string) => {
        setSearch('group', group);
    };
    const onChangeMentor = (mentor: string) => {
        setSearch('mentors', mentor);
    };

    return {
        filters: { groups: [...(groupsData || [])], mentors },
        filterPlacementTest: {
            groups: [...(groupsData || [])],
            mentors,
            status: PLACEMENT_TEST_FILTER_OPTIONS,
        },
        onChangePage,
        onChangeSearch,
        onChangeGroup,
        onChangeMentor,
    };
};

export default useFilterStudents;
