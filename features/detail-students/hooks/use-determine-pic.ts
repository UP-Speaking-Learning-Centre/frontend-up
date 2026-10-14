import { Role, FunnelStage, Grades } from '@/features/non-user/types';

export const useDeterminePIC = () => {
    const determinePICRole = (funnelStage: FunnelStage, gradeId?: Grades | string): Role => {
        if (funnelStage === FunnelStage.Asking || funnelStage === FunnelStage.Qualification) {
            return Role.StaffMarketing;
        }

        if (gradeId) {
            const gradeStr = gradeId.toString().toUpperCase();
            if (gradeStr.includes('TK') || gradeStr.includes('SD')) {
                return Role.StaffAdminBabyBear;
            }
            if (gradeStr.includes('SMP')) {
                return Role.StaffAdminPapaBear;
            }
            if (gradeStr.includes('SMA') || gradeStr.includes('UMUM')) {
                return Role.StaffAdminMamaBear;
            }
        }

        // Default if grades are not mapped properly but stage requires admin
        return Role.StaffAdminMamaBear;
    };

    return { determinePICRole };
};
