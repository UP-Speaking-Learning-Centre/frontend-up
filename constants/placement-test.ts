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
    },
    {
        id: 2,
        value: 'reviewed',
        name: 'Reviewed',
    },
    {
        id: 3,
        value: 'in_interview',
        name: 'In Interview',
    },
    {
        id: 4,
        value: 'done_interview',
        name: 'Done Interview',
    },
    {
        id: 5,
        value: 'graded',
        name: 'Graded',
    },
];
