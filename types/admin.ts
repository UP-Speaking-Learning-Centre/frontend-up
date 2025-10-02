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

export type ProgramRecurse =
    | ProgramDetail
    | ProgramDetailGroup
    | ProgramDetailLevel
    | ProgramDetailGrade
    | ProgramDetailPackage;

export type ProgramRecurseArray =
    | ProgramDetail[]
    | ProgramDetailGroup[]
    | ProgramDetailLevel[]
    | ProgramDetailGrade[]
    | ProgramDetailPackage[];

export interface LocationAdmin {
    id: number;
    name: string;
    address: string | null;
    img: string | null;
    googleMapsLink: string | null;
}

export interface TeacherAdmin {
    id: number;
    name: string;
    img: string;
    description: string;
    alias: string;
    location: string;
}

export interface PriceData {
    id: string;
    packageName: string;
    price: string;
    duration: string;
    durationType: 'days' | 'weeks' | 'months' | 'years';
}
export interface ProgramDetailPrice {
    amount: number;
    package: {
        id: number;
        name: string;
    };
    timeframe: string;
}
