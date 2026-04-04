'use client';

import ENDPOINTS from '@/constants/endpoints';
import {
    ActiveUserDetail,
    LapsedUserDetail,
    NonUserDetail,
    ResponseUserDetail,
} from '@/features/auth/constants/interface';
import api, { BaseService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const baseMockData: any = {
    id: 106,
    name: 'Student jadwal custom',
    isContacted: false,
    phoneNumber: '082295108710',
    instagram: 'asdadad',
    notes: 'Ini note yang lama',
    notesList: [
        {
            notes: 'Note 1 terbaru',
            role: 'Admin',
            name: 'Budi',
            timestamp: '2026-03-22T10:00:00.000Z',
        },
        {
            notes: 'Note 2 tentang pembayaran',
            role: 'Staff',
            name: 'Siti',
            timestamp: '2026-03-20T14:30:00.000Z',
        },
        {
            notes: 'Note 3 minta pindah jadwal',
            role: 'Teacher',
            name: 'Pak Firdan',
            timestamp: '2026-03-18T09:15:00.000Z',
        },
        {
            notes: 'Note 4 trial class',
            role: 'Admin',
            name: 'Andi',
            timestamp: '2026-03-15T11:20:00.000Z',
        },
        {
            notes: 'Note 5 pertama kali kontak',
            role: 'Marketing',
            name: 'Dina',
            timestamp: '2026-03-10T16:45:00.000Z',
        },
        {
            notes: 'Note 6 masuk funnel',
            role: 'System',
            name: 'System',
            timestamp: '2026-03-01T08:00:00.000Z',
        },
    ],
    trialClassAt: '2025-11-09T23:00:00.000Z',
    self_schedule_payload: null,
    preferredGroupId: 4,
    preferredGroupName: 'Senior High School',
    preferredProgramId: 1,
    preferredProgramName: 'School Program',
    programId: 1,
    program: 'School Program',
    groupId: 4,
    group: 'Senior High School',
    levelId: 10,
    level: 'Rookie',
    gradeId: 35,
    gradeLabel: 'Grade 1',
    studyGroupIds: [59],
    primaryStudyGroupId: 59,
    latestResult: null,
    packages: [{ packageId: 1, packageName: 'Semi Private' }],
    schedules: [
        {
            studyGroupId: 59,
            studyGroupName: 'Firdan',
            packageId: 1,
            packageName: 'Semi Private',
            dayOfWeek: 'FRI',
            startTime: '09:30:00',
            endTime: '11:00:00',
            location: 'Kuningan 1 (Stadion)',
            teacherMemberName: 'Mr. Firdan',
            teacherAlias: 'Baby Bear',
        },
        {
            studyGroupId: 59,
            studyGroupName: 'Firdan',
            packageId: 1,
            packageName: 'Semi Private',
            dayOfWeek: 'SAT',
            startTime: '21:00:00',
            endTime: '22:00:00',
            location: 'Kuningan 1 (Stadion)',
            teacherMemberName: 'Mr. Firdan',
            teacherAlias: 'Baby Bear',
        },
    ],
};

const mockActiveUser: ActiveUserDetail = {
    ...baseMockData,
    status: 'active',
    activeFrom: '2023-01-01',
    activeUntil: '2023-12-31',
    selectedPeriod: 12,
    studyGroupTeacher: 'Mr. Firdan',
    studyGroupSchedule1: 'FRI 09:30:00',
    studyGroupSchedule2: 'SAT 21:00:00',
    studyGroupLocation: 'Kuningan 1 (Stadion)',
};

const mockNonUser: NonUserDetail = {
    ...baseMockData,
    status: 'non_user',
    leadStatus: 'Hot',
    sourceLead: 'Instagram',
    funnelStage: 'Engaged',
    picRole: 'Staff',
    picPerson: 'Jane',
    recommendedProgram: 'Program B',
    recommendedGroup: 'Group 2',
    recommendedLevel: 'Intermediate',
    recommendedGrade: 'B',
    trialBranch: 'Cabang Utama',
    trialStudyGroup: 'Kelas Coba B',
    trialSchedule: 'Rabu 15:00',
    isTrialDone: false,
    offeredDuration: '3 Bulan',
    offeredPackage: 'Semi Private',
    offeredProgram: 'School Program',

    // specifically "Jadwal dan Study Group Pilihan User"
    userSelectedBranch: 'Kuningan 1 (Stadion)',
    userSelectedStudyGroup: 'Firdan',
    userSelectedTeacher: 'Mr. Firdan',
    userSelectedSchedule1: 'FRI 09:30:00',
    userSelectedSchedule2: 'SAT 21:00:00',
    isSelfSchedule: false,
};

const mockLapsedUser: LapsedUserDetail = {
    ...baseMockData,
    status: 'lapsed',
    lastProgram: 'Program C',
    lastGroup: 'Group C',
    lastLevel: 'Advanced',
    lastGrade: 'C',
    historyActiveFrom: '2022-01-01',
    historyActiveUntil: '2022-12-31',
    historySelectedPeriod: 12,
    lastStudyGroupName: 'Firdan',
    lastStudyGroupTeacher: 'Mr. Firdan',
    lastStudyGroupSchedule1: 'FRI 09:30:00',
    lastStudyGroupSchedule2: 'SAT 21:00:00',
    lastStudyGroupLocation: 'Kuningan 1 (Stadion)',
};

const useGetProfileById = (id: number, forcedMockType?: 'active' | 'non_user' | 'lapsed') => {
    // CHANGE THIS TO MOCK DIFFERENT UI ("active" | "non_user" | "lapsed")
    // Note: User can modify this file to return different mock sets.
    let mockType: 'active' | 'non_user' | 'lapsed' = forcedMockType || 'non_user';

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchAdminStudentById.expand({ id }), mockType],
        queryFn: async () => {
            // ---> REAL API LINE:
            const res = await api.get<ResponseUserDetail>(
                ENDPOINTS.fetchAdminStudentById.expand({ id })
            );
            return res.data;

            // ---> MOCK DB
            await new Promise(resolve => setTimeout(resolve, 300));

            const typeStr = mockType as string;
            if (typeStr === 'active') return mockActiveUser;
            if (typeStr === 'non_user') return mockNonUser;
            return mockLapsedUser;
        },
    });

    return { data, isLoading };
};

export default useGetProfileById;
