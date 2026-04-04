interface CreateStaffRequest {
    name: string;
    phoneNumber: string;
    role: string;
}

interface UpdateStaffRequest {
    name: string;
    phoneNumber: string;
    role: string;
}

interface Staff {
    adminPicId: number;
    userId: number;
    name: string;
    phoneNumber: string;
    role: string;
}

interface StaffResponse {
    data: Staff[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

interface StaffDetailResponse {
    data: Staff;
}

export type { CreateStaffRequest, UpdateStaffRequest, Staff, StaffResponse, StaffDetailResponse };
