export interface Teacher {
    id: number;
    memberName: string;
    isCoordinator: boolean;
    photoUrl: string;
    speciality: string;
    teacher: {
        id: number;
        name: string;
    };
    location: {
        id: number;
        name: string;
        address: string;
        img: string;
        googleMapsLink: string;
    };
}

export interface AllTeacherResponse extends Array<Teacher> {}
