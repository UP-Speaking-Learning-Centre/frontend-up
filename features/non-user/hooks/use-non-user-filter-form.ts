import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNonUserFilterStore } from '../stores/filter-store';
import { Role } from '../types';
import moment from 'moment';
import { ADMIN_ROLES } from '@/utils/user.helper';
import { useGetStaffsByRole } from '@/features/staff-management/queries/use-get-staffs-by-role';

export const filterSchema = z.object({
    studentName: z.string().optional(),
    funnelStage: z.string().optional(),
    leadStatus: z.string().optional(),
    picRole: z.array(z.string()).optional(),
    picStaff: z.array(z.string()).optional(),
    lastFollowUp: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional()
        .nullable(),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const useNonUserFilterForm = (menuType: 'marketing' | 'admin') => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPicRoleDropdownOpen, setIsPicRoleDropdownOpen] = useState(false);
    const [isPicStaffDropdownOpen, setIsPicStaffDropdownOpen] = useState(false);

    const applyFilters = useNonUserFilterStore(s => s.applyFilters);
    const resetFilters = useNonUserFilterStore(s => s.resetFilters);
    const currentFilters = useNonUserFilterStore(s => s.filters);

    // Filter values for form
    const getInitialPicRole = () => {
        if (menuType === 'marketing') return [Role.StaffMarketing];
        return currentFilters.picRole || [];
    };

    const getInitialPicStaff = () => currentFilters.picStaff || [];

    const queryRoles =
        menuType === 'marketing' ? [Role.StaffMarketing] : ADMIN_ROLES;
    const { data: staffsData } = useGetStaffsByRole(queryRoles);

    const picStaffOptions = useMemo(() => {
        if (!staffsData?.data) return [];
        return staffsData.data.map(staff => staff.name); // or user id if backend expects id
    }, [staffsData]);

    const form = useForm<FilterValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            studentName: currentFilters.studentName || '',
            funnelStage: currentFilters.funnelStage || '',
            leadStatus: currentFilters.leadStatus || '',
            picRole: getInitialPicRole(),
            picStaff: getInitialPicStaff(),
            lastFollowUp: {
                from: currentFilters.lastFollowUpFrom
                    ? moment(currentFilters.lastFollowUpFrom).toDate()
                    : undefined,
                to: currentFilters.lastFollowUpTo
                    ? moment(currentFilters.lastFollowUpTo).toDate()
                    : undefined,
            },
        },
    });

    const onSubmit = (values: FilterValues) => {
        let finalPicRole = values.picRole || [];
        if (menuType === 'marketing') {
            finalPicRole = [Role.StaffMarketing];
        } else if (menuType === 'admin' && finalPicRole.length === 0) {
            finalPicRole = [];
        }

        applyFilters({
            studentName: values.studentName || '',
            funnelStage: values.funnelStage,
            leadStatus: values.leadStatus,
            picRole: finalPicRole,
            picStaff: values.picStaff || [],
            lastFollowUpFrom: values.lastFollowUp?.from
                ? moment(values.lastFollowUp.from).toISOString()
                : undefined,
            lastFollowUpTo: values.lastFollowUp?.to
                ? moment(values.lastFollowUp.to).toISOString()
                : undefined,
        });
    };

    const handleReset = () => {
        form.reset({
            studentName: '',
            funnelStage: '',
            leadStatus: '',
            picRole: menuType === 'marketing' ? [Role.LeadMarketing, Role.StaffMarketing] : [],
            picStaff: [],
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
        isPicRoleDropdownOpen,
        setIsPicRoleDropdownOpen,
        isPicStaffDropdownOpen,
        setIsPicStaffDropdownOpen,
        adminRoles: ADMIN_ROLES,
        marketingRoles: [Role.StaffMarketing],
        picStaffOptions,
    };
};
