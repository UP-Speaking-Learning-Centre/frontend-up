import { parseTemplate } from 'url-template';

const ENDPOINTS = {
    fetchPrograms: '/programs',
    fetchGroups: parseTemplate('/programs/{programId}/groups'),
    fetchLevels: parseTemplate('/programs/{programId}/groups/{groupId}/levels'),
    fetchGrades: parseTemplate('/programs/{programId}/groups/{groupId}/levels/{levelId}/grades'),
    fetchPackages: parseTemplate('/packages'),
    fetchLocations: '/locations',
    fetchAvailableSchedule: parseTemplate('/locations/{locationId}/available-schedules'),
    fetchStudyGroups: parseTemplate('/locations/{locationId}/study-groups'),
    fetchDetailPlacementTest: parseTemplate('/placement-tests/{id}'),
    fetchAdminDetailPlacementTest: parseTemplate('/admin/placement-tests/{id}'),
    submitRegistration: '/registrations',
    submitRegistrationFromPlacement: '/auth/register',
    fetchPlacementTest: '/placement-tests/start-guest',
    submitPlacementTest: '/placement-tests/submit-guest',
    fetchTeacherSchedule: parseTemplate('/admin/teacher-schedules/{locationId}'),
    fetchStudyGroupDetail: parseTemplate('/admin/study-groups/{studyGroupId}'),
    fetchStudentOfStudyGroup: parseTemplate('/admin/study-groups/{studyGroupId}/students'),
    fetchTeachers: '/admin/teacher-team-members',
    fetchTeachersById: parseTemplate('/admin/teacher-team-members/{id}'),
} as const;

export default ENDPOINTS;
