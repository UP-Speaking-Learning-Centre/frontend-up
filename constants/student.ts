import { StudentRegistrationType } from '@/types/students';

export const REGISTRATION_TYPE: Record<
    'placementTest' | 'selfSchedule' | 'normal',
    StudentRegistrationType
> = {
    placementTest: 'Placement Test Registration',
    selfSchedule: 'Self-scheduling Registration',
    normal: 'Normal Registration',
};
