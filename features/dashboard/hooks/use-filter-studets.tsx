import { ALL_GROUP, ALL_PROGRAM, ALL_STATUS } from '@/features/admin/constants/config';
import useGetTeacherAll from '@/features/admin/queries/useGetTeacherAll';
import useGetProgram from '@/features/placement-test-admin/queries/use-get-program';
import { useStudentsStore } from '../stores/students-store';

const useFilterStudents = (
    setSearch: (key: string, value: any) => void,
    program: number,
    isNewStudent: boolean = false
) => {
    const { data: programsData, isLoading } = useGetProgram();
    const { data, isLoading: isLoadingTeacher } = useGetTeacherAll();

    const setPaginationNewStudent = useStudentsStore(s => s.setPaginationNewStudent);
    const setPaginationAll = useStudentsStore(s => s.setPagination);

    const setPagination = isNewStudent ? setPaginationNewStudent : setPaginationAll;

    const onChangePage = (page: number) => {
        setPagination({ currentPage: page });
    };
    const onChangeSearch = (string: string) => {
        if (!string) return setSearch('searchQuery', undefined);
        setSearch('searchQuery', string);
        setPagination({ currentPage: 1 });
    };
    const onChangeGroup = (group?: string) => {
        if (!group || group === ALL_GROUP) return setSearch('group', undefined);
        setSearch('group', Number(group));
        setPagination({ currentPage: 1 });
    };
    const onChangeProgram = (program: string) => {
        onChangeGroup(undefined);
        if (!program || program === ALL_PROGRAM) return setSearch('program', undefined);
        setSearch('program', Number(program));
        setPagination({ currentPage: 1 });
    };
    const onChangeMentor = (mentor: string) => {
        setSearch('mentors', mentor);
        setPagination({ currentPage: 1 });
    };
    const onChangeStatus = (status: string) => {
        if (status === ALL_STATUS) return setSearch('status', undefined);
        setSearch('status', status);
        setPagination({ currentPage: 1 });
    };

    const groupsData = programsData?.find(program_ => program_.id === program)?.groups;

    return {
        isLoadingFilter: isLoadingTeacher || isLoading,
        filters: {
            groups: groupsData || [],
            mentors: data || [],
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
