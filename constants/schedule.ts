import { TimeSlot } from '@/types/schedule';

export const timeSlots: TimeSlot[] = [
    { start: '08:00:00', end: '09:30:00', display: '08:00 - 09:30' },
    { start: '09:30:00', end: '11:00:00', display: '09:30 - 11:00' },
    { start: '11:00:00', end: '12:30:00', display: '11:00 - 12:30' },
    { start: '13:45:00', end: '15:15:00', display: '13:45 - 15:15' },
    { start: '15:15:00', end: '16:45:00', display: '15:15 - 16:45' },
    { start: '16:45:00', end: '18:15:00', display: '16:45 - 18:15' },
    { start: '19:00:00', end: '20:30:00', display: '19:00 - 20:30' },
];

export const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
