import { parseTemplate } from 'url-template';

const BASE_STAFF = '/admin/staff';

const ENDPOINTS = {
    fetchPrograms: '/programs',
    fetchGroups: parseTemplate('/programs/{programId}/groups'),
    fetchLevels: parseTemplate('/programs/{programId}/groups/{groupId}/levels'),
    fetchGrades: parseTemplate('/programs/{programId}/groups/{groupId}/levels/{levelId}/grades'),
    fetchPackages: '/packages',
    fetchLocations: '/locations',
    fetchAvailableSchedule: parseTemplate('/locations/{locationId}/available-schedules'),
    fetchStudyGroups: parseTemplate('/locations/{locationId}/study-groups'),
    fetchDetailPlacementTest: parseTemplate('/placement-tests/{id}'),
    fetchAdminDetailPlacementTest: parseTemplate('/admin/placement-tests/{id}'),
    fetchAdminDetailPlacementTestStatus: parseTemplate('/admin/placement-tests/{id}/status'),
    submitRegistration: '/registrations',
    submitRegistrationFromPlacement: '/auth/register',
    fetchPlacementTest: '/placement-tests/start-guest',
    submitPlacementTest: '/placement-tests/submit-guest',
    fetchTeacherSchedule: parseTemplate('/admin/teacher-schedules/location/{locationId}'),
    fetchStudyGroupDetail: parseTemplate('/admin/study-groups/{studyGroupId}'),
    fetchStudentOfStudyGroup: parseTemplate('/admin/study-groups/{studyGroupId}/assigned-students'),
    fetchAvailableStudent: parseTemplate('/admin/study-groups/{studyGroupId}/available-students'),
    assignStudentToStudyGroup: '/admin/study-groups/assign-students',
    unassignStudentFromStudyGroup: parseTemplate(
        '/admin/study-groups/{studyGroupId}/unassign-students'
    ),
    updatePriority: parseTemplate('/admin/study-groups/{studyGroupId}/priority'),
    fetchAvailableStudyGroup: parseTemplate(
        '/locations/{locationId}/study-groups?programId={programId}&groupId={groupId}&levelId={levelId}&packageId={packageId}'
    ),
    fetchTeachers: '/admin/teacher-team-members',
    fetchTeachersNoPage: '/admin/teacher-team-members/all',
    fetchTeachersById: parseTemplate('/admin/teacher-team-members/{id}'),
    fetchTeachersScheduleById: parseTemplate('/admin/teacher-team-members/{id}/schedules'),
    fetchPrices: '/prices',
    patchpricesByProgram: '/admin/program-packages/by-program-package',
    patchNoteByUserId: parseTemplate('/admin/students/{id}/notes'),
    fetchAlias: '/admin/teachers',
    fetchAdminLocations: '/admin/locations',
    fetchAdminLocationsById: parseTemplate('/admin/locations/{id}'),
    createNewStudyGroup: '/admin/study-groups',
    fetchAdminStudentById: parseTemplate('/admin/students/{id}'),
    fetchUnassignStudent: parseTemplate('/admin/study-groups/{studyGroupId}/unassign-students'),
    // fetchAssignStudent: parseTemplate('/admin/study-groups/{studyGroupId}/assign-students'),

    updateContactedStatus: parseTemplate('/admin/students/{id}/contacted'),

    allTeacher: '/teacher-team-members/all',

    // Staff
    baseStaff: BASE_STAFF,
    fetchStaffs: parseTemplate(BASE_STAFF + '?currentPage={currentPage}&limit={limit}'),
    staffById: parseTemplate(BASE_STAFF + '/{id}'),
} as const;

export default ENDPOINTS;
