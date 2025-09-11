import { create } from 'zustand';
import { PHONE } from '../constants/config';
import { AuthStoreInterface, StepType } from '../constants/interface';

const useAuthStore = create<AuthStoreInterface>()((set, get) => ({
    timeLeft: 0,
    setTimeLeft: time => set({ timeLeft: time }),
    step: PHONE as StepType,
    setStep: step => set({ step }),
    phone: '',
    setPhone(phone) {
        set({ phone });
    },
    isNewAccount: false,
    setIsNewAccount(isNewAccount) {
        set({ isNewAccount });
    },
    otpForTesting: '',
    setOtpForTesting: (otpForTesting: string) => set({ otpForTesting }),
    role: '',
    setRole: (role: string) => set({ role }),
}));

export default useAuthStore;
