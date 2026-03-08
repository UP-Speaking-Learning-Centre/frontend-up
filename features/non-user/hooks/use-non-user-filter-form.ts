import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNonUserFilterStore } from '../stores/filter-store';
import { Role } from '../types';
import moment from 'moment';
import { ADMIN_ROLES } from '@/utils/user.helper';

export const filterSchema = z.object({
    studentName: z.string().optional(),
    funnelStage: z.string().optional(),
    leadStatus: z.string().optional(),
    pic: z.array(z.string()).optional(),
    lastFollowUp: z.date().optional().nullable(),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const useNonUserFilterForm = (menuType: 'marketing' | 'admin') => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPicDropdownOpen, setIsPicDropdownOpen] = useState(false);
    
    const applyFilters = useNonUserFilterStore(s => s.applyFilters);
    const resetFilters = useNonUserFilterStore(s => s.resetFilters);
    const currentFilters = useNonUserFilterStore(s => s.filters);
    const isPicDefault = useNonUserFilterStore(s => s.isPicDefault);

    const getInitialPic = () => {
        if (menuType === 'marketing') return [Role.StaffMarketing];
        if (menuType === 'admin') {
            if (isPicDefault) {
                return ADMIN_ROLES;
            }
            return currentFilters.pic || [];
        }
        return currentFilters.pic || [];
    };

    const form = useForm<FilterValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            studentName: currentFilters.studentName || '',
            funnelStage: currentFilters.funnelStage || '',
            leadStatus: currentFilters.leadStatus || '',
            pic: getInitialPic(),
            lastFollowUp: currentFilters.lastFollowUp
                ? moment(currentFilters.lastFollowUp).toDate()
                : null,
        },
    });

    const onSubmit = (values: FilterValues) => {
        const isNowPicDefault = menuType === 'admin' ? isPicDefault : false;
        
        let finalPic = values.pic || [];
        if (menuType === 'admin' && finalPic.length === 0) {
            finalPic = ADMIN_ROLES;
        }

        applyFilters({
            studentName: values.studentName || '',
            funnelStage: values.funnelStage,
            leadStatus: values.leadStatus,
            pic: finalPic,
            lastFollowUp: values.lastFollowUp
                ? moment(values.lastFollowUp).toISOString()
                : undefined,
        }, isNowPicDefault);
    };

    const handleReset = () => {
        form.reset({
            studentName: '',
            funnelStage: '',
            leadStatus: '',
            pic: menuType === 'marketing' ? [Role.StaffMarketing] : ADMIN_ROLES,
            lastFollowUp: null,
        });
        resetFilters();
    };

    return {
        form,
        onSubmit,
        handleReset,
        isCalendarOpen,
        setIsCalendarOpen,
        isPicDropdownOpen,
        setIsPicDropdownOpen,
        isPicDefault,
        adminRoles: ADMIN_ROLES
    };
};
