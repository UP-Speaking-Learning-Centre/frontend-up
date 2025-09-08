'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useStudentsStore } from '../stores/students-store';
import { StudentPlacementTest, StudentType } from '@/types/students';
import { useEffect } from 'react';
import api, { baseService } from '@/lib/api';
import { API_ADMIN_LIST_PLACEMENT_TEST, API_ADMIN_LIST_STUDENTS } from '../constants/config';
import { BaseResponse } from '@/types/general';

const allUsers = [
    {
        id: '1',
        name: 'Budi Santoso',
        phone: '081234567890',
        email: 'budi@email.com',
        status: 'active',
        program: 'Elementary School',
        group: 'Novice',
        mentor: 'Ms. Feby',
        schedule: 'Senin & Rabu, 15:00-17:00',
        registrationType: 'regular',
        testDate: '2025-09-06',
        testStatus: 'doneInterview',
    },
    {
        id: '2',
        name: 'Sari Santoso',
        phone: '081234567891',
        email: 'sari@email.com',
        status: 'active',
        program: 'Junior High School',
        group: 'Beginners',
        mentor: 'Mr. Firdan',
        schedule: 'Selasa & Kamis, 17:00-19:00',
        registrationType: 'regular',
        testDate: '2025-09-06',
        testStatus: 'graded',
    },
    {
        id: '3',
        name: 'Andi Wijaya',
        phone: '089876543210',
        email: 'andi@email.com',
        status: 'pending',
        program: 'Elementary School',
        group: 'Elementary',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        testDate: '2025-09-06',
        testStatus: 'reviewed',
    },
    {
        id: '4',
        name: 'Maya Putri',
        phone: '087654321098',
        email: 'maya@email.com',
        status: 'pending',
        program: 'Elementary School',
        group: 'Elementary',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        testDate: '2025-09-06',
        testStatus: 'inInterview',
    },
    {
        id: '5',
        name: 'Reza Putra',
        phone: '085555555555',
        email: 'reza@email.com',
        status: 'pending',
        program: 'Junior High School',
        group: 'Interchange',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        testDate: '2025-09-06',
        testStatus: 'notGraded',
    },
];

const fetchStudents = () => {
    return baseService(async () => {
        const res = await api.get<BaseResponse<StudentPlacementTest[]>>(API_ADMIN_LIST_PLACEMENT_TEST, {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInBob25lTnVtYmVyIjoiMDgxMjM0NTY3ODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTczMDUzNzcsImV4cCI6MTc1NzM5MTc3N30.zjq1vZVhDVMoMXr8FSezwUUPQ0X3veRaBWjG7pPCyEY',
            },
        });
        return res.data;
    });
    // return allUsers;
};

const useFetchStudentsWithPlacementQuery = (): UseQueryResult<
    BaseResponse<StudentPlacementTest[]>
> => {
    const filters = useStudentsStore(s => s.filters);
    const setStudentsPlacementTest = useStudentsStore(s => s.setStudentsPlacementTest);

    const res = useQuery({
        queryKey: ['students-with-placement', Object.values(filters)],
        queryFn: fetchStudents,
    });

    useEffect(() => {
        if (res.status === 'success') {
            setStudentsPlacementTest(res.data.data);
        }
    }, [res.status]);

    return res;
};

export default useFetchStudentsWithPlacementQuery;
