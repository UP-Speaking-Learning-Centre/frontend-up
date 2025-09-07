import { parseTemplate } from 'url-template';

const ENDPOINTS = {
    fetchPrograms: '/programs',
    fetchGroups: parseTemplate('/programs/{programId}/groups'),
    fetchLevels: parseTemplate('/programs/{programId}/groups/{groupId}/levels'),
    fetchAvailableSchedule: parseTemplate('/locations/{locationId}/available-schedules'),
    fetchDetailPlacementTest: parseTemplate('/placement-tests/{id}'),
} as const;

export default ENDPOINTS;
