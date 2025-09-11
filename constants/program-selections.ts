export const CHOOSE_PROGRAM_STEP = 'choose_program' as const;
export const CHOOSE_GROUP_STEP = 'choose_group' as const;
export const GROUP_INFORMATION_STEP = 'group_information' as const;
export const CHOOSE_LEVEL_STEP = 'choose_level' as const;
export const CHOOSE_GRADE_STEP = 'choose_grade' as const;
export const CHOOSE_PACKAGE_STEP = 'choose_package' as const;
export const CHOOSE_SCHEDULE_STEP = 'choose_schedule' as const;
export const SUMMARY_STEP = 'summary_step' as const;
export const PRICE_STEP = 'price_step' as const;
export const FILL_PERSONAL_INFORMATION_STEP = 'fill_personal_information' as const;

export const PROGRAM_SELECTION_STEPS = [
    CHOOSE_PROGRAM_STEP,
    CHOOSE_GROUP_STEP,
    GROUP_INFORMATION_STEP,
    CHOOSE_LEVEL_STEP,
    CHOOSE_GRADE_STEP,
    CHOOSE_PACKAGE_STEP,
    CHOOSE_SCHEDULE_STEP,
    SUMMARY_STEP,
    PRICE_STEP,
    FILL_PERSONAL_INFORMATION_STEP,
] as const;

export const REGISTER_STEPS = [
    CHOOSE_PACKAGE_STEP,
    PRICE_STEP,
    FILL_PERSONAL_INFORMATION_STEP,
] as const;

export const DAY = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
export const START_TIME = [
    '08:00:00',
    '09:30:00',
    '11:00:00',
    '13:45:00',
    '15:15:00',
    '16:45:00',
    '19:00:00',
] as const;

export const END_TIME = [
    '09:30:00',
    '11:00:00',
    '12:30:00',
    '15:15:00',
    '16:45:00',
    '18:15:00',
    '20:30:00',
] as const;

export const GROUP_WITH_PLACEMENT_TEST = [2, 3, 4];
