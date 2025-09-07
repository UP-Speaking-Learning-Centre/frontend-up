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
        id: PLACEMENT_TEST_STATUS.notGraded,
        name: 'Not Graded',
    },
    {
        id: PLACEMENT_TEST_STATUS.reviewed,
        name: 'Reviewed',
    },
    {
        id: PLACEMENT_TEST_STATUS.inInterview,
        name: 'In Interview',
    },
    {
        id: PLACEMENT_TEST_STATUS.doneInterview,
        name: 'Done Interview',
    },
    {
        id: PLACEMENT_TEST_STATUS.graded,
        name: 'Graded',
    },
];
