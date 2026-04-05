import { Role } from '@/features/non-user/types';

export const ADMIN_ROLES = [Role.LeadAdmin, Role.StaffAdminBabyBear, Role.StaffAdminPapaBear, Role.StaffAdminMamaBear];

export const getActiveFilterCount = (
    filters: Record<string, any>,
    isPicDefault?: boolean
) => {
    return Object.values(filters).filter(val => {
        if (Array.isArray(val)) {
            // If the PIC filter is secretly default, we shouldn't count it as an active visible filter.
            if (isPicDefault && val === filters.pic) return false;
            return val.length > 0;
        }
        return val !== undefined && val !== null && val !== '';
    }).length;
};
