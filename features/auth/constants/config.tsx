export const PHONE = 'phone';
export const OTP = 'otp';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirm_password';
export const NEW_ACCOUNT = 'new-account';
export const PENDING = 'pending';
export const PLACEMENT_TEST = 'placement-test';
export const DEVELOPMENT = 'development';
export const ACTIVATION_REQUIRED = 'activation_required';
export const NOT_REGISTERED = 'not_registered';
export const ACCESS_TOKEN = 'accessToken';

// API URLs
export const API_PHONE_CHECKER = '/auth/check-phone';
export const API_OTP = '/auth/request-otp';
export const API_FIRST_LOGIN = '/auth/activate-account';
export const API_LOGIN = '/auth/login';

export const API_GET_STUDENT_BY_ID = (id: string) => '/profile/students/' + id;
export const API_GET_PROFILE = '/profile';
