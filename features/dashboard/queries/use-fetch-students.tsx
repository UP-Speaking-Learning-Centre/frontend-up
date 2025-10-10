import useAuthStore from '@/features/auth/stores/authStore';
import api, { BaseService } from '@/lib/api';
import { BaseResponse } from '@/types/general';
import { StudentType } from '@/types/students';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_ADMIN_LIST_STUDENTS } from '../constants/config';
import { useStudentsStore } from '../stores/students-store';

const allUsers = {
    data: [
        {
            studentId: 2,
            studentName: 'radit 21.22',
            parentPhoneNumber: '+6281211112210122',
            program: 'School Program',
            group: 'Junior High School',
            teacherName: 'N/A',
            schedule: 'No schedule',
        },
        {
            studentId: 1,
            studentName: 'Siswa Dengan Jadwal 2',
            parentPhoneNumber: '+6281288889999',
            program: 'School Program',
            group: 'Senior High School',
            teacherName: 'Ms. Nuraeni',
            schedule: 'MON 08:00:00, MON 11:00:00',
        },
    ],
    meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
    },
};

const fetchStudents = async (params: any, accessToken: string) => {
    // return allUsers as BaseResponse<StudentType[]>;
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

const useFetchStudentsQuery = () => {
    const filter = useStudentsStore(s => s.filters);
    const pagination = useStudentsStore(s => s.pagination);
    const setStudents = useStudentsStore(s => s.setStudents);
    const setPagination = useStudentsStore(s => s.setPagination);
    const accessToken = useAuthStore(s => s.token);

    const res = useQuery({
        queryKey: [API_ADMIN_LIST_STUDENTS, Object.values(filter), Object.values(pagination)],
        queryFn: async () =>
            await fetchStudents(
                {
                    studentName: filter.searchQuery,
                    teacherTeamMemberId: filter.mentors,
                    programId: filter.program,
                    groupId: filter.group,
                    currentPage: pagination.currentPage,
                },
                accessToken
            ),
        staleTime: 0,
    });

    useEffect(() => {
        if (res.status === 'success') {
            setStudents(res.data.data);
            setPagination(res.data.meta);
        }
    }, [res.data, res.status]);

    return res;
};

export default useFetchStudentsQuery;
