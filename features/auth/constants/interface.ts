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
export interface ResponseUserDetail {
    id: number;
    name: string;
    programName: string;
    groupName: string;
    levelName: string;
    gradeNumber?: number;
    schedules: ResponseUserDetailSchedule[];
    testResults: ResponseUserDetailTestResults[];
}

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
