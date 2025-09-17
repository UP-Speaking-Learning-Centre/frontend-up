export interface ProgramDetailTreeInterface {
    title: string;
    items: ProgramDetailTreeInterfaceItems[];
}

export interface ProgramDetailTreeInterfaceItems {
    title: string;
    description: string;
    children?: ProgramDetailTreeInterface;
}

export interface ProgramDetailPackage {
    gradePackageId: number;
    packageName: string;
    price1Month: number;
    price2Months: number;
    price6Months: number;
}

export interface ProgramDetailGrade {
    gradeId: number;
    gradeNumber: number;
    packages: ProgramDetailPackage[];
}
export interface ProgramDetailLevel {
    levelId: number;
    levelName: string;
    grades: ProgramDetailGrade[];
}

export interface ProgramDetailGroup {
    groupId: number;
    groupName: string;
    levels: ProgramDetailLevel[];
}

export interface ProgramDetail {
    programId: number;
    programName: string;
    groups: ProgramDetailGroup[];
}
