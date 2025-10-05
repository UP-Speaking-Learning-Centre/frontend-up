import { PriceData } from '@/types/admin';

export const API_PROGRAMS = '/admin/program-packages/';
export const API_LOCATION = '/admin/locations/';
export const API_TEACHERS = '/admin/teachers/';
export const API_UPLOAD_FILE = '/upload-file/';

export const ALL_PROGRAM = 'All Programs';
export const ALL_GROUP = 'All Groups';
export const ALL_MENTOR = 'All Mentors';
export const ALL_STATUS = 'All Status';

export const STATUS_OPTION = {
    NOT_GRADED: 'not_graded',
    REVIEWED: 'reviewed',
    IN_INTERVIEW: 'in_interview',
    DONE_INTERVIEW: 'done_interview',
    GRADED: 'graded',
};

export const INITIAL_PRICE: PriceData[] = [
    {
        id: Date.now().toString(),
        price: '',
        duration: '',
        durationType: 'months',
    },
];
export const PACKAGE_OPTIONS = [
    { value: 1, label: 'Semi Private' },
    { value: 2, label: 'Private' },
    { value: 3, label: 'Ekslusif' },
];

export const EXCLUDE_ITEMS = [
    'id',
    'title',
    'children',
    'programId',
    'programName',
    'groups',
    'groupId',
    'groupName',
    'levels',
    'levelId',
    'levelName',
    'grades',
    'gradeId',
    'gradeNumber',
    'packages',
    'gradePackageId',
    'packageName',
    'price1month',
    'price2months',
    'price6months',
    'prices',
];
