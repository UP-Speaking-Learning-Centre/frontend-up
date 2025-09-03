export type Question = {
    id: number;
    instruction: string;
    questionText: string;
    options: string[] | null;
    questionType: string;
};

export type PlacementTest = {
    questions: Question[];
    sessionId: string;
};
