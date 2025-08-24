export const CHOOSE_PROGRAM_STEP = 'choose_program' as const;
export const CHOOSE_GROUP_STEP = 'choose_group' as const;
export const GROUP_INFORMATION_STEP = 'group_information' as const;
export const CHOOSE_LEVEL_STEP = 'choose_level' as const;
export const CHOOSE_GRADE_STEP = 'choose_grade' as const;
export const CHOOSE_PACKAGE_STEP = 'choose_package' as const;
export const CHOOSE_SCHEDULE_STEP = 'choose_schedule' as const;
export const CHOOSE_PAYMENT_STEP = 'choose_payment' as const;
export const FILL_PERSONAL_INFORMATION_STEP = 'fill_personal_information' as const;

export const PROGRAM_SELECTION_STEPS = [
    CHOOSE_PROGRAM_STEP,
    CHOOSE_GROUP_STEP,
    GROUP_INFORMATION_STEP,
    CHOOSE_LEVEL_STEP,
    CHOOSE_GRADE_STEP,
    CHOOSE_PACKAGE_STEP,
    CHOOSE_SCHEDULE_STEP,
    CHOOSE_PAYMENT_STEP,
    FILL_PERSONAL_INFORMATION_STEP,
] as const;
