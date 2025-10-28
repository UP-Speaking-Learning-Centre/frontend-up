import { ResponseUserDetail } from '@/features/auth/constants/interface';
import { StudentRegistrationType } from '@/types/students';

export const getRegistrationType = (
    student?: ResponseUserDetail
): StudentRegistrationType | undefined => {
    if (!student) return;
    if (!student.levelId && !student.self_schedule_payload) return 'Placement Test Registration';
    if (!student.schedules.length) return 'Self-scheduling Registration';
    return 'Normal Registration';
};
