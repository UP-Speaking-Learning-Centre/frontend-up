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
        name: 'Not Graded',
    },
    {
        id: 2,
        name: 'Reviewed',
    },
    {
        id: 3,
        name: 'In Interview',
    },
    {
        id: 4,
        name: 'Done Interview',
    },
    {
        id: 5,
        name: 'Graded',
    },
];
