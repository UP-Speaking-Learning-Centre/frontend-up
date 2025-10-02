export interface ResponseUpdateStatus {
    resultId: number;
    status: string;
    student: {
        id: number;
        name: string;
        parentPhoneNumber: string;
    };
}

export interface ResponseCheckAnswer {
    answerId: number;
    checkAnswer: string;
    message: string;
}

export interface RequestSavePlacementTest {
    levelId: number;
    gradeId: number;
    locationId: number;
    scheduleIds: number[];
}

export interface ResponseSaveNote {
    resultId: number;
    student: {
        id: number;
        name: string;
        parentPhoneNumber: string;
    };
    notes: string;
    message: string;
}

export interface ResponseSavePlacementTest {
    resultId: number;
    determinedLevelId: number;
    gradeId: number;
    locationId: number;
    schedules: number[];
    message: string;
}

export interface ResponseLocation {
    locationId: number;
    locationName: string;
}

export interface FormStatusManagement {
    level: string;
    grade: string;
    location: string;
    mentor: string;
    studyGroup: string;
}
