import useAuthStore from '@/features/auth/stores/authStore';
import api, { BaseService } from '@/lib/api';
import { BaseResponse } from '@/types/general';
import { StudentType } from '@/types/students';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_ADMIN_LIST_STUDENTS } from '../constants/config';
import { useStudentsStore } from '../stores/students-store';

export const fetchStudents = async (params: any, accessToken: string) => {
    return BaseService(async () => {
        const res = await api.get<BaseResponse<StudentType[]>>(API_ADMIN_LIST_STUDENTS, {
            params,
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });
        return res.data;
    });
};

const useFetchStudentsQuery = (newStudent: boolean = false) => {
    const filterNewStudent = useStudentsStore(s => s.filterNewStudent);
    const filterAllStudent = useStudentsStore(s => s.filters);

    const paginationNewStudent = useStudentsStore(s => s.paginationNewStudent);
    const paginationAllStudent = useStudentsStore(s => s.pagination);

    const setStudents = useStudentsStore(s => s.setStudents);
    const setPagination = useStudentsStore(s => s.setPagination);

    const setNewStudents = useStudentsStore(s => s.setNewStudents);
    const setPaginationNewStudent = useStudentsStore(s => s.setPaginationNewStudent);

    const accessToken = useAuthStore(s => s.token);

    const filter = newStudent ? filterNewStudent : filterAllStudent;
    const pagination = newStudent ? paginationNewStudent : paginationAllStudent;

    const params = newStudent
        ? {
              studentName: filter.searchQuery,
              programId: filter.program,
              currentPage: pagination.currentPage,
              isContacted: false,
          }
        : {
              studentName: filterAllStudent.searchQuery,
              teacherTeamMemberId: filterAllStudent.mentors,
              programId: filterAllStudent.program,
              groupId: filterAllStudent.group,
              currentPage: paginationAllStudent.currentPage,
          };

    const res = useQuery({
        queryKey: [API_ADMIN_LIST_STUDENTS, Object.values(filter), Object.values(pagination)],
        queryFn: async () => await fetchStudents(params, accessToken),
        staleTime: 0,
        enabled: !!accessToken,
    });

    useEffect(() => {
        if (res.status === 'success') {
            if (newStudent) {
                setNewStudents(res.data.data);
                setPaginationNewStudent(res.data.meta);
            } else {
                setStudents(res.data.data);
                setPagination(res.data.meta);
            }
        }
    }, [res.data?.data.length, res.status, newStudent]);

    return res;
};

export default useFetchStudentsQuery;
