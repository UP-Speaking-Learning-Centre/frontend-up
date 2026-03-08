export enum Role {
    SuperAdmin = 'Super Admin',
    LeadAdmin = 'Lead Admin',
    StaffAdminBabyBear = 'Staff Admin Baby Bear',
    StaffAdminPapaBear = 'Staff Admin Papa Bear',
    StaffAdminMamaBear = 'Staff Admin Mama Bear',
    LeadMarketing = 'Lead Marketing',
    StaffMarketing = 'Staff Marketing',
}

export interface StaffMember {
    id: string;
    name: string;
    phone: string;
    role: Role;
}
