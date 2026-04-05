// import {
//     ActiveUserDetail,
//     NonUserDetail,
//     LapsedUserDetail,
// } from '@/features/auth/constants/interface';

// // Form dummy responses
// export const dummyActiveUser: ActiveUserDetail = {
//     id: 1,
//     name: 'John Doe (Active User)',
//     phoneNumber: '08123456789',
//     isContacted: true,
//     preferredGroupId: null,
//     preferredGroupName: null,
//     preferredProgramId: null,
//     preferredProgramName: null,
//     programId: 1,
//     program: 'Program A',
//     groupId: 1,
//     group: 'Group 1',
//     levelId: 1,
//     level: 'Beginner',
//     gradeId: 1,
//     gradeLabel: 'A',
//     studyGroupIds: [1],
//     primaryStudyGroupId: 1,
//     schedules: [],
//     instagram: '@johndoe',
//     trialClassAt: null,
//     packages: [],
//     status: 'active',
//     activePeriod: {
//         activeFrom: '2023-01-01',
//         activeUntil: '2023-12-31',
//         selectedPeriod: 12,
//     },
//     studyGroup: {
//         teacher: 'Mr. Smith',
//         schedules: ['Senin 10:00', 'Kamis 10:00'],
//         location: 'Cabang Utama',
//     },
// };

// export const dummyNonUser: NonUserDetail = {
//     ...dummyActiveUser,
//     id: 2,
//     name: 'Jane Doe (Non User)',
//     isContacted: false,
//     status: 'non_user',
//     marketing: {
//         statusLead: 'Hot',
//         sourceLead: 'Instagram',
//         funnelStage: 'Engaged',
//         picRole: 'Staff',
//         picPerson: 'Jane',
//         lastUpdate: '2023-10-27T10:00',
//     },
//     offer: {
//         program: 'Program A',
//         package: 'Private',
//         duration: '3 Bulan',
//         price: '5.000.000',
//     },
//     recommendation: {
//         program: 'Program B',
//         group: 'Group 2',
//         level: 'Intermediate',
//         grade: 'B',
//     },
//     trial: {
//         branch: 'Cabang Utama',
//         studyGroup: 'Kelas Coba B',
//         schedule: 'Rabu 15:00',
//         isDone: false,
//     },
// };

// export const dummyLapsedUser: LapsedUserDetail = {
//     ...dummyActiveUser,
//     id: 3,
//     name: 'Bob Doe (Lapsed User)',
//     isContacted: true,
//     status: 'lapsed',
//     lastProgram: {
//         name: 'Program C',
//         group: 'Group C',
//         level: 'Advanced',
//         grade: 'C',
//     },
//     history: {
//         activeFrom: '2022-01-01',
//         activeUntil: '2022-12-31',
//         selectedPeriod: 12,
//     },
//     lastStudyGroup: {
//         name: 'Study Group C',
//         teacher: 'Mrs. Jane',
//         schedules: ['Senin 10:00', 'Kamis 10:00'],
//         location: 'Cabang Utama',
//     },
// };
