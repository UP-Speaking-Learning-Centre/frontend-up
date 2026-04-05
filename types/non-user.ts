export interface CreateNonUserPayload {
    name: string;
    phoneNumber: string;
    instagram?: string | null;
    sourceLead: string;
    funnelStage: string;
    statusLead: string;
    notes?: string | null;
    adminPicId?: number;
    picRole?: string | null;
    picStaff?: string | null;
}

export interface NonUserItem {
    studentId: number;
    userId: number;
    name: string;
    phoneNumber: string;
    instagram: string | null;
    sourceLead: string;
    funnelStage: string;
    statusLead: string;
    programId: number | null;
    programName: string | null;
    groupId: number | null;
    groupName: string | null;
    notes: string | null;
    lastUpdate: string;
    adminPicId: number | null;
    picRole: string | null;
    picStaff: string | null;
    tanggalTrialClass: string | null;
    teacherTrialClass: string | null;
    grupTrialClass: string | null;
    datangTrialClass: boolean;
}

export interface NonUserListResponse {
    data: NonUserItem[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
