import { PackageType } from '@/types/programs-selection';
import { Schedule } from '@/types/study-group';

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
    role: string;
    setRole: (role: string) => void;
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
    role: 'admin' | 'user';
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
    notes: string;
    staffName: string;
    createdAt: string;
    createdBy: string;
}

export interface BaseResponseUserDetail {
    id: number;
    name: string;
    phoneNumber: string;
    isContacted: boolean;
    preferredGroupId: string | null;
    preferredGroupName: string | null;
    preferredProgramId: string | null;
    preferredProgramName: string | null;
    notes?: string | null;
    notesList?: NoteItem[];
    programId: number;
    program: string;
    groupId: number;
    group: string;
    levelId: number;
    level: string;
    gradeId: number;
    gradeLabel: string;
    studyGroupIds: number[];
    primaryStudyGroupId: number;
    schedules: Schedule[];
    latestResult?: {
        determinedLevelId: string | null;
        determinedLevelName: string | null;
        group: string | null;
        groupId: string | null;
        placementTestId: number;
        program: string | null;
        programId: string | null;
        score: number;
        status: string;
    };
    instagram: string;
    trialClassAt: string | null;
    packages: { packageId: number; packageName: string }[];
    self_schedule_payload?: {
        mode: 'self';
        items: Schedule[];
        groupId: number;
        levelId: number;
        programId: number;
    };
}

export interface ActiveUserDetail extends BaseResponseUserDetail {
    status: 'active';
    activePeriod?: {
        activeFrom?: string;
        activeUntil?: string;
        selectedPeriod?: 3 | 6 | 12;
    };
    studyGroup?: {
        teacher?: string;
        location?: string;
        schedules?: string[];
    };
}

export interface NonUserDetail extends BaseResponseUserDetail {
    status: 'non_user';
    marketing?: {
        leadStatus?: string;
        sourceLead?: string;
        funnelStage?: string;
        picRole?: string;
        picPerson?: string;
        lastFollowUp?: string;
    };
    offer?: {
        program?: string;
        package?: string;
        duration?: string;
        price?: string;
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

export interface LapsedUserDetail extends BaseResponseUserDetail {
    status: 'lapsed';
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

export type ResponseUserDetail = ActiveUserDetail | NonUserDetail | LapsedUserDetail;

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
