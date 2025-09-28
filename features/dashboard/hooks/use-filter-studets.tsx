import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import { ALL_GROUP, ALL_PROGRAM, ALL_STATUS } from '@/features/admin/constants/config';
import useGetProgram from '@/features/placement-test-admin/queries/use-get-program';
import { useStudentsStore } from '../stores/students-store';
import useGetTeacher from '@/features/placement-test-admin/queries/use-get-teacher';
import useGetTeachers from '@/features/admin/queries/useGetTeachers';

const useFilterStudents = (setSearch: (key: string, value: any) => void, program: number) => {
    const { data: programsData, isLoading } = useGetProgram();
    const { data, isLoading: isLoadingTeacher } = useGetTeachers();

    const setPagination = useStudentsStore(s => s.setPagination);

    const onChangePage = (page: number) => {
        setPagination({ currentPage: page });
    };
    const onChangeSearch = (string: string) => {
        if (!string) return setSearch('searchQuery', undefined);
        setSearch('searchQuery', string);
    };
    const onChangeGroup = (group?: string) => {
        if (!group || group === ALL_GROUP) return setSearch('group', undefined);
        setSearch('group', Number(group));
    };
    const onChangeProgram = (program: string) => {
        onChangeGroup(undefined);
        if (!program || program === ALL_PROGRAM) return setSearch('program', undefined);
        setSearch('program', Number(program));
    };
    const onChangeMentor = (mentor: string) => {
        setSearch('mentors', mentor);
    };
    const onChangeStatus = (status: string) => {
        if (status === ALL_STATUS) return setSearch('status', undefined);
        setSearch('status', status);
    };

    const groupsData = programsData?.find(program_ => program_.id === program)?.groups;

    return {
        isLoadingFilter: isLoadingTeacher || isLoading,
        filters: {
            groups: groupsData || [],
            mentors: data?.data || [],
            programs: programsData || [],
        },
        onChangePage,
        onChangeSearch,
        onChangeGroup,
        onChangeProgram,
        onChangeMentor,
        onChangeStatus,
    };
};

export default useFilterStudents;
