import { PackageType } from '@/types/programs-selection';
import { Schedule } from '@/types/study-group';
import { Role } from '@/features/non-user/types';

export interface LoginRequest {
    phone: string;
}

export type StepType = 'phone' | 'otp' | 'password';

export interface AuthStoreInterface {
    step: StepType;
    setStep: (step: StepType) => void;
    timeLeft: number;
    setTimeLeft: (time: number) => void;
    phone: string;
    setPhone: (phone: string) => void;
    isNewAccount: boolean;
    setIsNewAccount: (isNewAccount: boolean) => void;
    otpForTesting: string;
    setOtpForTesting: (otpForTesting: string) => void;
    role: Role | '';
    setRole: (role: Role | '') => void;
    token: string;
    setToken: (token: string) => void;
}

export interface PasswordForm {
    password: string;
    confirm_password: string;
}

export interface ResponseCheckPhone {
    message: string;
    status: 'activation_required' | 'not_registered';
}

export interface ResponseOTP {
    message: string;
    otpForTesting: string;
}

export interface ResponseFirstLogin {
    message: string;
}
export interface ResponseLogin {
    accessToken: string;
    role: Role;
}

export interface RequestFirstLogin {
    phoneNumber: string;
    otp: string;
    newPassword: string;
}
export interface RequestLogin {
    phoneNumber: string;
    password: string;
}
export interface ResponseUserDetailSchedule {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    locationName: string;
    teacherName: string;
}
export interface ResponseUserDetailTestResults {
    testName: string;
    score: number;
    status: string;
}

export interface NoteItem {
    id: number;
    notes: string;
    staffName: string;
    createdAt: string;
    createdBy: string;
}

export interface StudentDetailSchedule {
    studyGroupId: number | null;
    studyGroupName: string | null;
    packageId: number | null;
    packageName: string | null;
    dayOfWeek: string | null;
    startTime: string | null;
    endTime: string | null;
    location: string | null;
    teacherMemberName: string | null;
    teacherAlias: string | null;
}

export interface BaseResponseUserDetail {
    id: number;
    name: string;
    phoneNumber: string | null;
    isContacted: boolean | null;
    preferredGroupId: number | null;
    preferredGroupName: string | null;
    preferredProgramId: number | null;
    preferredProgramName: string | null;
    notes?: string | null;
    notesList?: NoteItem[];
    programId: number | null;
    program: string | null;
    groupId: number | null;
    group: string | null;
    levelId: number | null;
    level: string | null;
    gradeId: number | null;
    gradeLabel: string | null;
    studyGroupIds: number[];
    primaryStudyGroupId: number | null;
    schedules: StudentDetailSchedule[];
    assignedStudyGroup?: {
        studyGroupId: number | null;
        studyGroupName: string | null;
        packageId: number | null;
        packageName: string | null;
        teacher: string | null;
        location: string | null;
        schedules: string[];
    } | null;
    latestResult?: {
        determinedLevelId: number | null;
        determinedLevelName: string | null;
        group: string | null;
        groupId: number | null;
        placementTestId: number | null;
        program: string | null;
        programId: number | null;
        score: number | null;
        status: string | null;
    };
    instagram: string | null;
    trialClassAt: string | null;
    packages: { packageId: number; packageName: string }[];
    self_schedule_payload?: {
        mode: 'self';
        items: Schedule[];
        groupId: number;
        levelId: number;
        programId: number;
    };
    status: 'active' | 'non_user' | 'lapsed';
}

export interface ActiveUserDetail {
    activePeriod?: {
        id?: number | null;
        activeFrom?: string | null;
        activeUntil?: string | null;
        selectedPeriod?: number | null;
        createdBy?: string | null;
        createdAt?: string | null;
    };
    studyGroup?: {
        teacher?: string;
        location?: string;
        schedules?: string[];
    };
}

export interface NonUserDetail {
    marketing?: {
        statusLead?: string;
        sourceLead?: string;
        funnelStage?: string;
        picRole?: string;
        picPerson?: string;
        lastUpdate?: string;
        cancelReason?: string;
        adminPicId?: number;
    };
    offer?: {
        id?: number | null;
        programId?: number | null;
        program?: string | null;
        groupId?: number | null;
        group?: string | null;
        levelId?: number | null;
        level?: string | null;
        gradeId?: number | null;
        grade?: string | null;
        packageId?: number | null;
        package?: string | null;
        duration?: number | null;
        price?: string | null;
        createdBy?: string | null;
        createdAt?: string | null;
    };
    recommendation?: {
        program?: string;
        group?: string;
        level?: string;
        grade?: string;
    };
    trial?: {
        branch?: string;
        studyGroup?: string;
        schedule?: string;
        isDone?: boolean;
    };
    selection?: {
        branch?: string;
        studyGroup?: string;
        teacher?: string;
        schedules?: string[];
        isSelfSchedule?: boolean;
    };
}

export interface LapsedUserDetail {
    history?: {
        activeFrom?: string;
        activeUntil?: string;
        selectedPeriod?: 3 | 6 | 12;
    };
    lastProgram?: {
        name?: string;
        group?: string;
        level?: string;
        grade?: string;
    };
    lastStudyGroup?: {
        name?: string;
        teacher?: string;
        location?: string;
        schedules?: string[];
    };
}

export type ResponseUserDetail = BaseResponseUserDetail & {
    history?: {
        activeFrom?: string;
        activeUntil?: string;
        selectedPeriod?: 3 | 6 | 12;
    };
    lastProgram?: {
        name?: string;
        group?: string;
        level?: string;
        grade?: string;
    };
    lastStudyGroup?: {
        name?: string;
        teacher?: string;
        location?: string;
        schedules?: string[];
    };
    marketing?: {
        studentId?: number;
        statusLead?: string;
        sourceLead?: string;
        funnelStage?: string;
        picRole?: string;
        picStaff?: string;
        legacyPicRole?: string | null;
        legacyPicStaff?: string | null;
        lastUpdate?: string;
        cancelReason?: string;
        adminPicId?: number;
        programId?: number;
        programName?: string;
        tanggalTrialClass?: string;
        teacherTrialClass?: string;
        grupTrialClass?: string;
        datangTrialClass?: boolean;
        notesTerbaru?: string;
    };
    offer?: {
        id?: number | null;
        programId?: number | null;
        program?: string | null;
        groupId?: number | null;
        group?: string | null;
        levelId?: number | null;
        level?: string | null;
        gradeId?: number | null;
        grade?: string | null;
        packageId?: number | null;
        package?: string | null;
        duration?: number | null;
        price?: string | null;
        createdBy?: string | null;
        createdAt?: string | null;
    };
    recommendation?: {
        program?: string;
        group?: string;
        level?: string;
        grade?: string;
    };
    trialClass?: {
        id?: number | null;
        studyGroupId?: number | null;
        studyGroupName?: string | null;
        schedule?: string | null;
        isDone?: boolean | null;
    };
    selection?: {
        branch?: string;
        studyGroup?: string;
        teacher?: string;
        schedules?: string[];
        isSelfSchedule?: boolean;
    };
    activePeriod?: {
        id?: number | null;
        activeFrom?: string | null;
        activeUntil?: string | null;
        selectedPeriod?: number | null;
        createdBy?: string | null;
        createdAt?: string | null;
    };
    studyGroup?: {
        teacher?: string;
        location?: string;
        schedules?: string[];
    };
};

export interface ResponseProfile {
    id: number;
    phoneNumber: string;
    instagram: string;
    students: ResponseUserDetail[];
}

export interface SidebarProps {
    selectedStudent?: ResponseUserDetail;
    data?: ResponseProfile;
}
