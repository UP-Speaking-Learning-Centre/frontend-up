export const QUESTION_TYPE = {
    multipleChoice: 'multiple_choice',
    fillInTheBlank: 'fill_in_the_blank',
    freeText: 'free_text',
} as const;

export const PLACEMENT_TEST_STATUS = {
    notGraded: 'notGraded',
    reviewed: 'reviewed',
    inInterview: 'inInterview',
    doneInterview: 'doneInterview',
    graded: 'graded',
} as const;

export const PLACEMENT_TEST_FILTER_OPTIONS = [
    {
        id: 1,
        value: 'not_graded',
        name: 'Not Graded',
        color: 'bg-red-100 border border-red-500 text-red-600',
    },
    {
        id: 2,
        value: 'reviewed',
        name: 'Reviewed',
        color: 'bg-green-100 border border-green-500 text-green-600',
    },
    {
        id: 3,
        value: 'in_interview',
        name: 'In Interview',
        color: 'bg-yellow-100 border border-yellow-500 text-yellow-600',
    },
    {
        id: 4,
        value: 'done_interview',
        name: 'Done Interview',
        color: 'bg-blue-100 border border-blue-500 text-blue-600',
    },
    {
        id: 5,
        value: 'graded',
        name: 'Graded',
        color: 'bg-purple-100 border border-purple-500 text-purple-600',
    },
];
