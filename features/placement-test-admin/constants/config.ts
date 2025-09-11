import { parseTemplate } from 'url-template';

export const API_CHECK_ANSWER = (id?: string) => `admin/placement-tests/answers/${id}/check`;
export const API_LOCATION = '/locations';
export const API_AVAIL_SCHEDULE = parseTemplate('/locations/{id}/available-schedules');
export const API_AVAIL_TEACHER = parseTemplate('/locations/{id}/teachers');
export const API_PROGRAM = '/programs';
export const API_GROUP = parseTemplate('/programs/{programId}/groups');
export const API_LEVEL = parseTemplate('/programs/{programId}/groups/{groupId}/levels');
export const API_GRADE = parseTemplate(
    '/programs/{programId}/groups/{groupId}/levels/{levelId}/grades'
);
