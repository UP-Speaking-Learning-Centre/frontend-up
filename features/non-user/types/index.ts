export enum FunnelStage {
    Asking = 'Asking',
    Qualification = 'Qualification',
    TrialClass = 'Trial Class',
    PlacementTest = 'Placement Test',
    Quotation = 'Quotation',
    Registered = 'Registered',
    Cancel = 'Cancel',
}

export enum LeadStatus {
    Cold = 'Cold',
    Warm = 'Warm',
    Hot = 'Hot',
    Lost = 'Lost',
    Converted = 'Converted',
}

export enum Role {
    SuperAdmin = 'Super Admin',
    LeadAdmin = 'Lead Admin',
    StaffAdminBabyBear = 'Staff Admin Baby Bear',
    StaffAdminPapaBear = 'Staff Admin Papa Bear',
    StaffAdminMamaBear = 'Staff Admin Mama Bear',
    LeadMarketing = 'Lead Marketing',
    StaffMarketing = 'Staff Marketing',
}

export enum SourceLead {
    Event = 'Event',
    Website = 'Website',
    WhatsApp = 'WhatsApp',
}

export enum Grades {
    TK = 'TK',
    SD = 'SD',
    SMP = 'SMP',
    SMA = 'SMA',
    Umum = 'Umum',
}

export interface NonUserMarketingType {
    name: string;
    phone: string;
    sourceLead: SourceLead;
    funnelStage: FunnelStage;
    statusLead: LeadStatus;
    pic: Role;
    lastUpdate: string;
    programDiminati: string;
    tanggalTrialClass: string;
    teacherTrialClass: string;
    grupTrialClass: string;
    datangTrialClass: boolean;
    notesTerbaru: string;
}
